package com.zaidom.radiancewellness.infrastructure.exception;

public class RadianceException extends RuntimeException {
    public RadianceException(String message) {
        super(message);
    }
    public RadianceException(String message, Throwable cause) {
        super(message, cause);
    }
}
