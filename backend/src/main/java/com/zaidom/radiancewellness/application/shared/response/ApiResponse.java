package com.zaidom.radiancewellness.application.shared.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class ApiResponse<T> {

    private boolean status;
    private String message;
    private T data;

    public static ApiResponse<?> Error(String message) {
        return new ApiResponse<>(false, message, null);
    }

    public static <T> ApiResponse<T> Data(T data) {
        return new ApiResponse<>(true, "", data);
    }

    public static <T> ApiResponse<T> Data(T data, String message) {
        return new ApiResponse<>(true, message, data);
    }

    public static ApiResponse<?> Nothing(String message) {
        return new ApiResponse<>(true, message, null);
    }

    public static ApiResponse<?> Nothing() {
        return new ApiResponse<>(true, "", null);
    }
}
