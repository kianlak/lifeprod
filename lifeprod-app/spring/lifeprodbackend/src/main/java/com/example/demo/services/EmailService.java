package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.models.EmailDetails;

@Service
public interface EmailService {
	EmailDetails makeEmailDetails(String userEmail, String token);
  
	boolean sendSimpleMail(EmailDetails details);  
}
