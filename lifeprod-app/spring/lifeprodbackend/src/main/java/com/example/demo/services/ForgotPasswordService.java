package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.models.ForgotPassword;

@Service
public interface ForgotPasswordService {
	public String generateToken();
	public String setupForgetPasswordToken(String email);
	
	public boolean resetUserPassword(String token, String email, String password);
	
	public ForgotPassword findByEmail(String email);
}
