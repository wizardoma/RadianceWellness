package com.zaidom.radiancewellness.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zaidom.radiancewellness.domain.enums.UserRole;
import com.zaidom.radiancewellness.domain.enums.UserStatus;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.Map;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@ActiveProfiles("test")
@Transactional
class AdminAuthControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String LOGIN_URL = "/api/v1/admin/auth/login";
    private static final String REFRESH_URL = "/api/v1/admin/auth/refresh";
    private static final String LOGOUT_URL = "/api/v1/admin/auth/logout";

    private static final String TEST_EMAIL = "testadmin@test.com";
    private static final String TEST_PASSWORD = "TestPass1";

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();

        User admin = User.builder()
                .email(TEST_EMAIL)
                .password(passwordEncoder.encode(TEST_PASSWORD))
                .firstName("Test")
                .lastName("Admin")
                .phone("+2340000000000")
                .role(UserRole.SUPER_ADMIN)
                .status(UserStatus.ACTIVE)
                .loginAttempts(0)
                .build();
        userRepository.save(admin);
    }

    // ── Login Tests ────────────────────────────────────────────────────

    @Test
    @DisplayName("Login with valid credentials returns 200 with tokens and user info")
    void login_withValidCredentials_returns200() throws Exception {
        Map<String, String> request = Map.of(
                "email", TEST_EMAIL,
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.data.accessToken").exists())
                .andExpect(jsonPath("$.data.refreshToken").exists())
                .andExpect(jsonPath("$.data.expiresIn").exists());
    }

    @Test
    @DisplayName("Login with wrong password returns 401")
    void login_withWrongPassword_returns401() throws Exception {
        Map<String, String> request = Map.of(
                "email", TEST_EMAIL,
                "password", "WrongPassword1"
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Login with non-existent email returns 401")
    void login_withNonExistentEmail_returns401() throws Exception {
        Map<String, String> request = Map.of(
                "email", "nobody@test.com",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Login with empty email returns 400")
    void login_withEmptyEmail_returns400() throws Exception {
        Map<String, String> request = Map.of(
                "email", "",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Login with empty password returns 400")
    void login_withEmptyPassword_returns400() throws Exception {
        Map<String, String> request = Map.of(
                "email", TEST_EMAIL,
                "password", ""
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Login when account is locked returns 401 with locked message")
    void login_whenAccountLocked_returns401() throws Exception {
        // Lock the account by setting lockedUntil to 30 minutes from now
        User user = userRepository.findByEmail(TEST_EMAIL).orElseThrow();
        user.setLockedUntil(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        Map<String, String> request = Map.of(
                "email", TEST_EMAIL,
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message", containsStringIgnoringCase("locked")));
    }

    @Test
    @DisplayName("Five failed login attempts lock the account")
    void fiveFailedAttempts_locksAccount() throws Exception {
        Map<String, String> wrongRequest = Map.of(
                "email", TEST_EMAIL,
                "password", "WrongPassword1"
        );

        // Attempt login with wrong password 5 times
        for (int i = 0; i < 5; i++) {
            mockMvc.perform(post(LOGIN_URL)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(wrongRequest)))
                    .andExpect(status().isUnauthorized());
        }

        // Now attempt with correct password — should still be locked
        Map<String, String> correctRequest = Map.of(
                "email", TEST_EMAIL,
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(correctRequest)))
                .andExpect(status().isUnauthorized());

        // Verify user is locked in the database
        User lockedUser = userRepository.findByEmail(TEST_EMAIL).orElseThrow();
        assertTrue(lockedUser.getLoginAttempts() >= 5, "Login attempts should be at least 5");
        assertNotNull(lockedUser.getLockedUntil(), "lockedUntil should be set");
        assertTrue(lockedUser.getLockedUntil().isAfter(LocalDateTime.now()), "lockedUntil should be in the future");
    }

    // ── Refresh Token Tests ────────────────────────────────────────────

    @Test
    @DisplayName("Refresh with a valid refresh token returns 200 with new access token")
    void refresh_withValidToken_returns200() throws Exception {
        // First login to get a refresh token
        String refreshToken = loginAndGetRefreshToken();

        Map<String, String> refreshRequest = Map.of("refreshToken", refreshToken);

        mockMvc.perform(post(REFRESH_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.data.accessToken").exists());
    }

    @Test
    @DisplayName("Refresh with an invalid token returns 401")
    void refresh_withInvalidToken_returns401() throws Exception {
        Map<String, String> refreshRequest = Map.of("refreshToken", "invalid-token");

        mockMvc.perform(post(REFRESH_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Refresh with a revoked token (after logout) returns 401")
    void refresh_withRevokedToken_returns401() throws Exception {
        // Login to get tokens
        MvcResult loginResult = performLogin();
        String responseBody = loginResult.getResponse().getContentAsString();
        Map<String, Object> loginResponse = objectMapper.readValue(responseBody, Map.class);
        Map<String, Object> data = (Map<String, Object>) loginResponse.get("data");
        String accessToken = (String) data.get("accessToken");
        String refreshToken = (String) data.get("refreshToken");

        // Logout to revoke the refresh token
        mockMvc.perform(post(LOGOUT_URL)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk());

        // Try to refresh with the revoked token
        Map<String, String> refreshRequest = Map.of("refreshToken", refreshToken);

        mockMvc.perform(post(REFRESH_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshRequest)))
                .andExpect(status().isUnauthorized());
    }

    // ── Logout Tests ───────────────────────────────────────────────────

    @Test
    @DisplayName("Logout with a valid access token returns 200")
    void logout_withValidToken_returns200() throws Exception {
        String accessToken = loginAndGetAccessToken();

        mockMvc.perform(post(LOGOUT_URL)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));
    }

    @Test
    @DisplayName("Logout without a token returns 401")
    void logout_withoutToken_returns401() throws Exception {
        mockMvc.perform(post(LOGOUT_URL))
                .andExpect(status().isUnauthorized());
    }

    // ── Helper Methods ─────────────────────────────────────────────────

    private MvcResult performLogin() throws Exception {
        Map<String, String> request = Map.of(
                "email", TEST_EMAIL,
                "password", TEST_PASSWORD
        );

        return mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();
    }

    private String loginAndGetAccessToken() throws Exception {
        MvcResult result = performLogin();
        String responseBody = result.getResponse().getContentAsString();
        Map<String, Object> response = objectMapper.readValue(responseBody, Map.class);
        Map<String, Object> data = (Map<String, Object>) response.get("data");
        return (String) data.get("accessToken");
    }

    private String loginAndGetRefreshToken() throws Exception {
        MvcResult result = performLogin();
        String responseBody = result.getResponse().getContentAsString();
        Map<String, Object> response = objectMapper.readValue(responseBody, Map.class);
        Map<String, Object> data = (Map<String, Object>) response.get("data");
        return (String) data.get("refreshToken");
    }
}
