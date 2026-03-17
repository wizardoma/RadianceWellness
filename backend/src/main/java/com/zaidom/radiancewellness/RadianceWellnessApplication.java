package com.zaidom.radiancewellness;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RadianceWellnessApplication {

    public static void main(String[] args) {
        SpringApplication.run(RadianceWellnessApplication.class, args);
    }
}
