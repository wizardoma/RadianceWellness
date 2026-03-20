package com.zaidom.radiancewellness.application.shared.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class PaginatedApiResponse<T> {

    private boolean status;
    private String message;
    private List<T> data;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean hasNext;
    private boolean hasPrevious;

    public static <T> PaginatedApiResponse<T> of(List<T> data, int page, int size, long totalElements, int totalPages) {
        return new PaginatedApiResponse<>(
                true, "", data, page, size, totalElements, totalPages,
                page < totalPages, page > 1
        );
    }
}
