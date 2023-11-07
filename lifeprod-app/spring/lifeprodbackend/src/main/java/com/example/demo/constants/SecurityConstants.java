package com.example.demo.constants;

import java.util.Arrays;
import java.util.List;

public interface SecurityConstants {
	final String USER_PATH = "/api/user";
	final String CSRF_PATH = "/api/csrf";
	
	public static final List<String> ACCESS_CONTROL_URLS = Arrays.asList(
		USER_PATH + "/all",
		USER_PATH + "/signup",
		USER_PATH + "/login",
		
		"/sendMail",
		
		CSRF_PATH + "/get",
		
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
		USER_PATH + "/signup",
		
		CSRF_PATH + "/get",
		
		"/sendMail",
		
		"/actuator/shutdown"
	);
}