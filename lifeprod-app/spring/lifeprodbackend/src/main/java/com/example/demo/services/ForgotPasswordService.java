package com.example.demo.services;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.ForgotPassword;
import com.example.demo.repositories.ForgotPasswordRepository;

@Service
public class ForgotPasswordService {
	private static final Logger LOGGER = LoggerFactory.getLogger(ForgotPasswordService.class);

	@Autowired
  private ForgotPasswordRepository forgotPasswordRepository;
	
  public ForgotPasswordService(ForgotPasswordRepository  forgotPasswordRepository) {
  	this.forgotPasswordRepository = forgotPasswordRepository;
  }
	
  private static final int TOKEN_LENGTH = 16;
	
	public String generateToken() {
		LOGGER.info("\u001B[36m Generating Token... \u001B[0m");
		
		SecureRandom secureRandom = new SecureRandom();
    byte[] tokenBytes = new byte[TOKEN_LENGTH];
    secureRandom.nextBytes(tokenBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
	}
	
	public String setupForgetPasswordToken(String email) {
		String token = generateToken();
		LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(10);

		LOGGER.info("\u001B[32m SUCCESS: Generated Forgot Password Token and Expiration \u001B[0m");
				
		try {
			if(forgotPasswordRepository.findByEmail(email) != null) {
				LOGGER.info("\u001B[36m Replacing old token... \u001B[0m");
				ForgotPassword forgotPassword = forgotPasswordRepository.findByEmail(email);
				forgotPassword.setToken(token);
				forgotPassword.setExpirationDate(expirationDate);
	      forgotPasswordRepository.save(forgotPassword);
	      
	      LOGGER.info("\u001B[32m SUCCESS: Successfully setup forgot password token \u001B[0m");
	  		
	  		return forgotPassword.getToken();
			}
			else {
				ForgotPassword forgotPassword = new ForgotPassword(null, email, token, expirationDate);
				forgotPasswordRepository.save(forgotPassword);
				
				LOGGER.info("\u001B[32m SUCCESS: Successfully setup forgot password token \u001B[0m");
				
				return forgotPassword.getToken();
			}
		}
		catch (Exception e) {
			LOGGER.error("\u001B[31m ERROR: Could not process token generation at this time \u001B[0m", e);
			return "";
		}
	}
	
  public ForgotPassword findByEmail(String email) {
  	return forgotPasswordRepository.findByEmail(email);
  }
}
