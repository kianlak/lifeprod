package com.example.demo.constants;

import java.util.Arrays;
import java.util.List;

public interface SecurityConstants {
	final String USER_PATH = "/api/user";
	final String FORGOT_PASSWORD_PATH = "/api/fp";
	final String ENTRY_PATH = "/api/entry";
	
	public static final List<String> ACCESS_CONTROL_URLS = Arrays.asList(
		// API Paths
		USER_PATH + "/**",
		FORGOT_PASSWORD_PATH + "/**",
		ENTRY_PATH + "/**",
		
		// Actuator Paths
		"/actuator/shutdown"
	);
	
	public static final List<String> PERMITTED_ACCESS_CONTROL_URLS = Arrays.asList(
		"/actuator/shutdown"
	);
	
	public static final List<String> PERMITTED_CORS_URLS = Arrays.asList(
		"http://localhost:5173",
		"http://localhost:3000",
		"http://localhost:8080"
	);

	public static final List<String> OMITTED_CSRF_URLS = Arrays.asList(	
		// User Paths
		USER_PATH + "/login",
		USER_PATH + "/signup",

		// Login Paths
		FORGOT_PASSWORD_PATH + "/generate",
		FORGOT_PASSWORD_PATH + "/passwordreset",
		
		// Actuator Paths
		"/actuator/shutdown"
	);
}