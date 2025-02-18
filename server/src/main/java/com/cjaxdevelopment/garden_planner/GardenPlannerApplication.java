package com.cjaxdevelopment.garden_planner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class GardenPlannerApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
        // Optionally, set system properties so Spring Boot picks them up
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

		SpringApplication.run(GardenPlannerApplication.class, args);
	}

}
