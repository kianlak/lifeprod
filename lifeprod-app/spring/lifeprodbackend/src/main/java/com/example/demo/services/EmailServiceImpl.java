package com.example.demo.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.models.EmailDetails;
 
@Service
public class EmailServiceImpl implements EmailService {
	private static final Logger LOGGER = LoggerFactory.getLogger(ForgotPasswordService.class);

  @Autowired 
  private JavaMailSender javaMailSender;
  
  @Value("${spring.mail.username}") 
  private String sender;
  
  private static final String EMAIL_SUBJECT = "LifeProd Password Reset";
  private static final String EMAIL_TEMPLATE = "Here is your token to reset your password.\nYour token will expire in 10 minutes.\nToken: %s";
 
	public EmailDetails makeEmailDetails(String userEmail, String token) {
		EmailDetails email = new EmailDetails();
		email.setRecipient(userEmail);
		email.setMsgBody(String.format(EMAIL_TEMPLATE, token));
		email.setSubject(EMAIL_SUBJECT);
		
		return email;
	}

  public boolean sendSimpleMail(EmailDetails details) {
  	try {
      SimpleMailMessage mailMessage = new SimpleMailMessage();
      
      mailMessage.setFrom(sender);
      mailMessage.setTo(details.getRecipient());
      mailMessage.setText(details.getMsgBody());
      mailMessage.setSubject(details.getSubject());
      javaMailSender.send(mailMessage);
      
      LOGGER.info("\u001B[32m SUCCESS: Email has been sent \u001B[0m");
      
      return true;
    }
    catch (Exception e) {
  		LOGGER.error("\u001B[31m ERROR: Could not send email at this time \u001B[0m", e);
      return false;	
    }
  }
}