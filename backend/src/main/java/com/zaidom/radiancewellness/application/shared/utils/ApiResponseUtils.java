package com.zaidom.radiancewellness.application.shared.utils;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.shared.response.PaginatedApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponseUtils {

    public static <T> ResponseEntity<ApiResponse<T>> okResponse(T data) {
        return ResponseEntity.ok(ApiResponse.Data(data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> okResponse(T data, String message) {
        return ResponseEntity.ok(ApiResponse.Data(data, message));
    }

    public static ResponseEntity<ApiResponse<?>> okResponse() {
        return ResponseEntity.ok(ApiResponse.Nothing());
    }

    public static ResponseEntity<ApiResponse<?>> okResponse(String message) {
        return ResponseEntity.ok(ApiResponse.Nothing(message));
    }

    public static <T> ResponseEntity<ApiResponse<T>> createdResponse(T data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.Data(data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> createdResponse(T data, String message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.Data(data, message));
    }

    public static <T> ResponseEntity<PaginatedApiResponse<T>> paginatedResponse(Page<T> page) {
        return ResponseEntity.ok(PaginatedApiResponse.of(
                page.getContent(),
                page.getNumber() + 1,
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        ));
    }
}
