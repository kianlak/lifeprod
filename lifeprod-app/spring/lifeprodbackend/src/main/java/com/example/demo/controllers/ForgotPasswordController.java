package com.example.demo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.EmailDetails;
import com.example.demo.services.EmailService;
import com.example.demo.services.ForgotPasswordService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/fp")
public class ForgotPasswordController {
	@Autowired
	private ForgotPasswordService forgotPasswordService;
	
	@Autowired 
	private EmailService emailService;
	
	@PostMapping("/generate")
	public ResponseEntity<String> generateToken(@RequestBody Map<String, String> requestBody) {
		final String userEmail = requestBody.get("email");
		String token = forgotPasswordService.setupForgetPasswordToken(userEmail);
		
		if (token.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("Something went wrong internally");
		}
		else {
			EmailDetails email = emailService.makeEmailDetails(userEmail, token);
			boolean status = emailService.sendSimpleMail(email);
			
			return status ? 
				ResponseEntity.ok("Email sent") : 
				ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
		}
	}
	
	@PostMapping("/passwordreset")
	public ResponseEntity<String> passwordResetRequest(@RequestBody Map<String, String> requestBody) {
		final String token = requestBody.get("token");
		final String email = requestBody.get("email");
		final String newPassword = requestBody.get("password");
		
		System.out.println(token + " " + email + " " + newPassword + " ");
		
		if (email.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("Email missing, please resubmit form");
		}
		else {
			boolean status = forgotPasswordService.resetUserPassword(token, email, newPassword);
			
			return status ? 
					ResponseEntity.ok("Password has been reset") : 
					ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password");
		}
	}
}
