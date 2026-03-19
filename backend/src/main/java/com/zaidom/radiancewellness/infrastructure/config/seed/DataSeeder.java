package com.zaidom.radiancewellness.infrastructure.config.seed;

import com.zaidom.radiancewellness.domain.enums.UserRole;
import com.zaidom.radiancewellness.domain.enums.UserStatus;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .email("admin@radiancewellness.com")
                    .password(passwordEncoder.encode("Admin@2026!"))
                    .firstName("Admin")
                    .lastName("Radiance")
                    .phone("+2340000000000")
                    .role(UserRole.SUPER_ADMIN)
                    .status(UserStatus.ACTIVE)
                    .build();

            userRepository.save(admin);
            log.info("Admin user seeded: admin@radiancewellness.com");
        } else {
            log.info("Users already exist, skipping seed");
        }
    }
}
