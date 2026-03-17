package com.zaidom.radiancewellness.presentation.controller;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.okResponse;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<?>> health() {
        return okResponse("Radiance Wellness Spa API is running");
    }
}
