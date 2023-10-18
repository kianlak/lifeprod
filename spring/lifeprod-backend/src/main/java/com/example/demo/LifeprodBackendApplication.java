package com.example.demo;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.zaxxer.hikari.HikariDataSource;

@SpringBootApplication
public class LifeprodBackendApplication {
  private static final Logger LOGGER = LoggerFactory.getLogger(LifeprodBackendApplication.class);

	public static void main(String[] args) {		
    ConfigurableApplicationContext context = SpringApplication.run(LifeprodBackendApplication.class, args);

		LOGGER.info("\u001B[32m SUCCESS: Backend server started \u001B[0m");
	}
}