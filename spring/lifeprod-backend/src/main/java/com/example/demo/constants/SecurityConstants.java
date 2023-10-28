package com.example.demo.constants;

import java.util.Arrays;
import java.util.List;

public interface SecurityConstants {
	public static final List<String> PERMITTED_HTTP_PATHS = Arrays.asList(
		"/api/user/all",
		"/api/user/signup"
	);
	
	public static final List<String> PERMITTED_CORS_URLS = Arrays.asList(
		"http://localhost:5173",
		"http://localhost:3000"
	);
}