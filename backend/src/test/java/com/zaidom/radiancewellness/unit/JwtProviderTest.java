package com.zaidom.radiancewellness.unit;

import com.zaidom.radiancewellness.application.service.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.lang.reflect.Field;
import java.security.Key;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class JwtProviderTest {

    @Autowired
    private JwtProvider jwtProvider;

    private static final String TEST_USER_ID = "RW-TEST123456789012345";
    private static final String TEST_EMAIL = "test@test.com";
    private static final String TEST_NAME = "Test User";
    private static final String TEST_ROLE = "SUPER_ADMIN";
    private static final String TEST_USER_TYPE = "ADMIN";

    @Test
    @DisplayName("generateAccessToken returns a valid JWT string")
    void generateAccessToken_returnsValidJwt() {
        String token = jwtProvider.generateAccessToken(TEST_USER_ID, TEST_EMAIL, TEST_NAME, TEST_ROLE, TEST_USER_TYPE);

        assertNotNull(token);
        assertTrue(token.contains("."), "JWT token should contain dots separating header, payload, and signature");
        assertEquals(2, token.chars().filter(c -> c == '.').count(), "JWT token should have exactly 2 dots");
    }

    @Test
    @DisplayName("generateRefreshToken returns a valid JWT string")
    void generateRefreshToken_returnsValidJwt() {
        String token = jwtProvider.generateRefreshToken(TEST_USER_ID, TEST_USER_TYPE);

        assertNotNull(token);
        assertTrue(token.contains("."), "JWT token should contain dots separating header, payload, and signature");
        assertEquals(2, token.chars().filter(c -> c == '.').count(), "JWT token should have exactly 2 dots");
    }

    @Test
    @DisplayName("extractUserId returns the correct userId from a valid token")
    void extractUserId_fromValidToken() {
        String token = jwtProvider.generateAccessToken(TEST_USER_ID, TEST_EMAIL, TEST_NAME, TEST_ROLE, TEST_USER_TYPE);

        String userId = jwtProvider.extractUserId(token);

        assertEquals(TEST_USER_ID, userId);
    }

    @Test
    @DisplayName("extractEmail returns the correct email from a valid token")
    void extractEmail_fromValidToken() {
        String token = jwtProvider.generateAccessToken(TEST_USER_ID, TEST_EMAIL, TEST_NAME, TEST_ROLE, TEST_USER_TYPE);

        String email = jwtProvider.extractEmail(token);

        assertEquals(TEST_EMAIL, email);
    }

    @Test
    @DisplayName("extractRole returns the correct role from a valid token")
    void extractRole_fromValidToken() {
        String token = jwtProvider.generateAccessToken(TEST_USER_ID, TEST_EMAIL, TEST_NAME, TEST_ROLE, TEST_USER_TYPE);

        String role = jwtProvider.extractRole(token);

        assertEquals(TEST_ROLE, role);
    }

    @Test
    @DisplayName("extractUserType returns the correct userType from a valid token")
    void extractUserType_fromValidToken() {
        String token = jwtProvider.generateAccessToken(TEST_USER_ID, TEST_EMAIL, TEST_NAME, TEST_ROLE, TEST_USER_TYPE);

        String userType = jwtProvider.extractUserType(token);

        assertEquals(TEST_USER_TYPE, userType);
    }

    @Test
    @DisplayName("validateToken rejects an expired token")
    void validateToken_rejectsExpiredToken() throws Exception {
        // Build a token that is already expired using the same signing key via reflection
        Field secretField = JwtProvider.class.getDeclaredField("jwtSecret");
        secretField.setAccessible(true);
        String secret = (String) secretField.get(jwtProvider);

        Key signingKey = Keys.hmacShaKeyFor(secret.getBytes());

        String expiredToken = Jwts.builder()
                .setSubject(TEST_USER_ID)
                .claim("email", TEST_EMAIL)
                .claim("role", TEST_ROLE)
                .claim("userType", TEST_USER_TYPE)
                .setIssuedAt(new Date(System.currentTimeMillis() - 120000)) // 2 minutes ago
                .setExpiration(new Date(System.currentTimeMillis() - 60000)) // 1 minute ago
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();

        Claims claims = jwtProvider.validateToken(expiredToken);

        assertNull(claims, "Expired token should return null claims");
    }

    @Test
    @DisplayName("validateToken rejects a malformed token")
    void validateToken_rejectsMalformedToken() {
        Claims claims = jwtProvider.validateToken("not.a.jwt");

        assertNull(claims, "Malformed token should return null claims");
    }

    @Test
    @DisplayName("validateToken rejects a tampered token")
    void validateToken_rejectsTamperedToken() {
        String token = jwtProvider.generateAccessToken(TEST_USER_ID, TEST_EMAIL, TEST_NAME, TEST_ROLE, TEST_USER_TYPE);

        // Tamper with the token by modifying a character in the signature portion
        String tamperedToken = token.substring(0, token.length() - 5) + "XXXXX";

        Claims claims = jwtProvider.validateToken(tamperedToken);

        assertNull(claims, "Tampered token should return null claims");
    }

    @Test
    @DisplayName("validateToken rejects null and empty tokens")
    void validateToken_rejectsNullAndEmpty() {
        Claims nullClaims = jwtProvider.validateToken(null);
        assertNull(nullClaims, "Null token should return null claims");

        Claims emptyClaims = jwtProvider.validateToken("");
        assertNull(emptyClaims, "Empty token should return null claims");
    }
}
