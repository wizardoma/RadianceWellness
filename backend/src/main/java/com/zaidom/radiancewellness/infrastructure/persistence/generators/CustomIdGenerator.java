package com.zaidom.radiancewellness.infrastructure.persistence.generators;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.security.SecureRandom;

public class CustomIdGenerator implements IdentifierGenerator {

    private static final String PREFIX = "RW-";
    private static final String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int RANDOM_LENGTH = 22;
    private static final SecureRandom random = new SecureRandom();

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        StringBuilder id = new StringBuilder(PREFIX);
        for (int i = 0; i < RANDOM_LENGTH; i++) {
            id.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return id.toString();
    }
}
