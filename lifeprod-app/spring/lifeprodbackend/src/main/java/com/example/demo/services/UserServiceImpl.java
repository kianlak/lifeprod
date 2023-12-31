package com.example.demo.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
		
  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public boolean signUpUser(User user) {
		LOGGER.info("\u001B[36m Attempting to Sign Up User... \u001B[0m");
  	
		if (!userRepository.existsByUsername(user.getUsername()) && !userRepository.existsByEmail(user.getEmail())) {
      try {
      	String hashedPassword = passwordEncoder.encode(user.getPassword());
    		user.setPassword(hashedPassword);
        userRepository.save(user);
        
        LOGGER.info("\u001B[32m SUCCESS: Signed up user {} \u001B[0m", user.getUsername());
        return true;
      } catch (Exception e) {
        LOGGER.error("\u001B[31m ERROR: Could not sign up user {} \u001B[0m", user.getUsername(), e);
      }
    }
    return false;
	}
  
  public boolean loginUser(User user, String password) {
		LOGGER.info("\u001B[36m Attempting to Login User... \u001B[0m");
  			
		if (user != null && verifyPassword(password, user.getPassword())) {
			LOGGER.info("\u001B[32m SUCCESS: Logged in user {} \u001B[0m", user.getUsername());
			return true;
		}
		
		LOGGER.error("\u001B[31m ERROR: Could not Login user {}, due to password mismatch or no user with that username \u001B[0m", user.getUsername());
		return false;
  }

  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }
  
  public User findByUsername(String username) {
  	return userRepository.findByUsername(username);
  }
  
  public User findByEmail(String email) {
  	return userRepository.findByEmail(email);
  }
  
  public boolean verifyPassword(String plainPassword, String hashedPassword) {
    return passwordEncoder.matches(plainPassword, hashedPassword);
  }
  
  public List<User> getAllUsers() {
		return userRepository.findAll();
	}
}
