package com.zaidom.radiancewellness.application.usecase.admin.auth;

import com.zaidom.radiancewellness.infrastructure.persistence.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class AdminLogoutUseCase {

    private final RefreshTokenRepository refreshTokenRepository;

    public void execute(String userId) {
        refreshTokenRepository.deleteByUserId(userId);
    }
}
