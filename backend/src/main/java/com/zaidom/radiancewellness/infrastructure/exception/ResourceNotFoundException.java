package com.zaidom.radiancewellness.infrastructure.exception;

public class ResourceNotFoundException extends RadianceException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    public ResourceNotFoundException(String resource, String id) {
        super(resource + " not found with ID: " + id);
    }
}
