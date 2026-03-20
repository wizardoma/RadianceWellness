package com.zaidom.radiancewellness.application.usecase.staff.auth;

import com.zaidom.radiancewellness.infrastructure.persistence.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class StaffLogoutUseCase {

    private final RefreshTokenRepository refreshTokenRepository;

    public void execute(String userId) {
        log.info("Staff logout for userId: {}", userId);
        refreshTokenRepository.deleteByUserId(userId);
        log.info("Refresh tokens deleted for staff userId: {}", userId);
    }
}
