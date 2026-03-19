package com.zaidom.radiancewellness.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.domain.model.PasswordResetToken;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.PasswordResetTokenRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@ActiveProfiles("test")
@Transactional
class CustomerAuthControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    private static final String REGISTER_URL = "/api/v1/auth/register";
    private static final String LOGIN_URL = "/api/v1/auth/login";
    private static final String REFRESH_URL = "/api/v1/auth/refresh";
    private static final String LOGOUT_URL = "/api/v1/auth/logout";
    private static final String FORGOT_PASSWORD_URL = "/api/v1/auth/forgot-password";
    private static final String RESET_PASSWORD_URL = "/api/v1/auth/reset-password";

    private static final String TEST_PASSWORD = "JohnPass1";

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }

    // ── Registration Tests ─────────────────────────────────────────────

    @Test
    @DisplayName("Register with valid data returns 201 with customerId and email")
    void register_withValidData_returns201() throws Exception {
        Map<String, String> request = Map.of(
                "firstName", "John",
                "lastName", "Doe",
                "email", "john@test.com",
                "phone", "+2341234567890",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.data.customerId").exists())
                .andExpect(jsonPath("$.data.email").value("john@test.com"));
    }

    @Test
    @DisplayName("Register with duplicate email returns 409")
    void register_withDuplicateEmail_returns409() throws Exception {
        createCustomerDirectly("existing@test.com", "+2340000000099");

        Map<String, String> request = Map.of(
                "firstName", "John",
                "lastName", "Doe",
                "email", "existing@test.com",
                "phone", "+2341234567891",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("Register with duplicate phone returns 409")
    void register_withDuplicatePhone_returns409() throws Exception {
        createCustomerDirectly("unique@test.com", "+2340000000001");

        Map<String, String> request = Map.of(
                "firstName", "John",
                "lastName", "Doe",
                "email", "another@test.com",
                "phone", "+2340000000001",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("Register with weak password returns 400")
    void register_withWeakPassword_returns400() throws Exception {
        Map<String, String> request = Map.of(
                "firstName", "John",
                "lastName", "Doe",
                "email", "john@test.com",
                "phone", "+2341234567890",
                "password", "weak"
        );

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Register with missing required fields returns 400")
    void register_withMissingFields_returns400() throws Exception {
        Map<String, String> request = Map.of(
                "firstName", "",
                "lastName", "Doe",
                "email", "john@test.com",
                "phone", "+2341234567890",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    // ── Login Tests ────────────────────────────────────────────────────

    @Test
    @DisplayName("Login with valid credentials returns 200 with tokens")
    void login_withValidCredentials_returns200() throws Exception {
        registerCustomerViaApi("logintest@test.com", "+2341111111111");

        Map<String, String> loginRequest = Map.of(
                "email", "logintest@test.com",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.data.accessToken").exists())
                .andExpect(jsonPath("$.data.refreshToken").exists())
                .andExpect(jsonPath("$.data.expiresIn").exists());
    }

    @Test
    @DisplayName("Login with wrong password returns 401")
    void login_withWrongPassword_returns401() throws Exception {
        registerCustomerViaApi("wrongpw@test.com", "+2342222222222");

        Map<String, String> loginRequest = Map.of(
                "email", "wrongpw@test.com",
                "password", "WrongPassword1"
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Login with non-existent email returns 401")
    void login_withNonExistentEmail_returns401() throws Exception {
        Map<String, String> loginRequest = Map.of(
                "email", "nobody@test.com",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Five failed login attempts lock the customer account")
    void fiveFailedAttempts_locksAccount() throws Exception {
        registerCustomerViaApi("locktest@test.com", "+2343333333333");

        Map<String, String> wrongRequest = Map.of(
                "email", "locktest@test.com",
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
                "email", "locktest@test.com",
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(correctRequest)))
                .andExpect(status().isUnauthorized());
    }

    // ── Refresh Token Tests ────────────────────────────────────────────

    @Test
    @DisplayName("Refresh with a valid token returns 200 with new access token")
    void refresh_withValidToken_returns200() throws Exception {
        registerCustomerViaApi("refresh@test.com", "+2344444444444");
        String refreshToken = loginAndGetRefreshToken("refresh@test.com");

        Map<String, String> refreshRequest = Map.of("refreshToken", refreshToken);

        mockMvc.perform(post(REFRESH_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.data.accessToken").exists());
    }

    @Test
    @DisplayName("Refresh with a revoked token (after logout) returns 401")
    void refresh_withRevokedToken_returns401() throws Exception {
        registerCustomerViaApi("revoke@test.com", "+2345555555555");

        MvcResult loginResult = performLogin("revoke@test.com");
        Map<String, Object> loginData = extractDataFromResponse(loginResult);
        String accessToken = (String) loginData.get("accessToken");
        String refreshToken = (String) loginData.get("refreshToken");

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

    // ── Forgot Password Tests ──────────────────────────────────────────

    @Test
    @DisplayName("Forgot password always returns 200 to prevent user enumeration")
    void forgotPassword_returns200Always() throws Exception {
        Map<String, String> request = Map.of("email", "nonexistent@test.com");

        mockMvc.perform(post(FORGOT_PASSWORD_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));
    }

    // ── Reset Password Tests ───────────────────────────────────────────

    @Test
    @DisplayName("Reset password with a valid token returns 200 and login with new password works")
    void resetPassword_withValidToken_returns200() throws Exception {
        // Register a customer
        registerCustomerViaApi("resetpw@test.com", "+2346666666666");

        // Find the customer to get their ID
        Customer customer = customerRepository.findByEmail("resetpw@test.com").orElseThrow();

        // Create a password reset token directly in the database
        String resetTokenValue = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(resetTokenValue)
                .customerId(customer.getId())
                .expiryDate(LocalDateTime.now().plusHours(1))
                .used(false)
                .build();
        passwordResetTokenRepository.save(resetToken);

        // Reset the password
        String newPassword = "NewPass1";
        Map<String, String> resetRequest = Map.of(
                "token", resetTokenValue,
                "newPassword", newPassword
        );

        mockMvc.perform(post(RESET_PASSWORD_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(resetRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));

        // Verify login works with the new password
        Map<String, String> loginRequest = Map.of(
                "email", "resetpw@test.com",
                "password", newPassword
        );

        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").exists());
    }

    @Test
    @DisplayName("Reset password with an invalid token returns 400")
    void resetPassword_withInvalidToken_returns400() throws Exception {
        Map<String, String> request = Map.of(
                "token", "invalid-reset-token",
                "newPassword", "NewPass1"
        );

        mockMvc.perform(post(RESET_PASSWORD_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    // ── Logout Tests ───────────────────────────────────────────────────

    @Test
    @DisplayName("Logout with valid token returns 200")
    void logout_returns200() throws Exception {
        registerCustomerViaApi("logout@test.com", "+2347777777777");
        String accessToken = loginAndGetAccessToken("logout@test.com");

        mockMvc.perform(post(LOGOUT_URL)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));
    }

    // ── Helper Methods ─────────────────────────────────────────────────

    private void createCustomerDirectly(String email, String phone) {
        Customer customer = Customer.builder()
                .firstName("Test")
                .lastName("Customer")
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(TEST_PASSWORD))
                .status(CustomerStatus.ACTIVE)
                .emailVerified(false)
                .loginAttempts(0)
                .build();
        customerRepository.save(customer);
    }

    private void registerCustomerViaApi(String email, String phone) throws Exception {
        Map<String, String> request = Map.of(
                "firstName", "John",
                "lastName", "Doe",
                "email", email,
                "phone", phone,
                "password", TEST_PASSWORD
        );

        mockMvc.perform(post(REGISTER_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    private MvcResult performLogin(String email) throws Exception {
        Map<String, String> request = Map.of(
                "email", email,
                "password", TEST_PASSWORD
        );

        return mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> extractDataFromResponse(MvcResult result) throws Exception {
        String body = result.getResponse().getContentAsString();
        Map<String, Object> response = objectMapper.readValue(body, Map.class);
        return (Map<String, Object>) response.get("data");
    }

    private String loginAndGetAccessToken(String email) throws Exception {
        MvcResult result = performLogin(email);
        Map<String, Object> data = extractDataFromResponse(result);
        return (String) data.get("accessToken");
    }

    private String loginAndGetRefreshToken(String email) throws Exception {
        MvcResult result = performLogin(email);
        Map<String, Object> data = extractDataFromResponse(result);
        return (String) data.get("refreshToken");
    }
}
