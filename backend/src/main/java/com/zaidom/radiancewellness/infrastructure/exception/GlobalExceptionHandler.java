package com.zaidom.radiancewellness.infrastructure.exception;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final CustomValidationHandler validationHandler;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse<?>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = validationHandler.getFirstValidationError(ex);
        return new ResponseEntity<>(ApiResponse.Error(errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse<?>> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.info("IllegalArgumentException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiResponse<?>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        log.info("ResourceNotFoundException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ApiResponse<?>> handleUnauthorizedException(UnauthorizedException ex) {
        log.info("UnauthorizedException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse<?>> handleBadRequestException(BadRequestException ex) {
        log.info("BadRequestException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ApiResponse<?>> handleConflictException(ConflictException ex) {
        log.info("ConflictException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse<?>> handleValidationException(ValidationException ex) {
        log.info("ValidationException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PaymentException.class)
    @ResponseStatus(HttpStatus.PAYMENT_REQUIRED)
    public ResponseEntity<ApiResponse<?>> handlePaymentException(PaymentException ex) {
        log.warn("PaymentException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.PAYMENT_REQUIRED);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ResponseEntity<ApiResponse<?>> handleMethodNotAllowedException(HttpRequestMethodNotSupportedException ex) {
        log.info("MethodNotAllowedException: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ApiResponse<?>> handleAccessDeniedException(AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error("Access denied: " + ex.getMessage()), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ApiResponse<?>> handleAuthenticationException(AuthenticationException ex) {
        log.warn("Authentication exception: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error("Authentication failed: " + ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiResponse<?>> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        log.warn("No handler found: {}", ex.getMessage());
        return new ResponseEntity<>(ApiResponse.Error("The requested endpoint does not exist: " + ex.getRequestURL()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ApiResponse<?>> handleGeneralException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        return new ResponseEntity<>(ApiResponse.Error(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
