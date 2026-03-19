package com.zaidom.radiancewellness.application.usecase.admin.profile;

import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetAdminProfileUseCase {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User execute(String userId) {
        log.info("Fetching admin profile for userId: {}", userId);

        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
