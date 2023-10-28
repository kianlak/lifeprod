package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class LifeProdBackendAuthentication implements AuthenticationProvider {
	@Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;
  
  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String username = authentication.getName();
    String password = authentication.getCredentials().toString();
    
    User user = userRepository.findByUsername(username);

    if (user != null) {
      if (passwordEncoder.matches(password, user.getPassword())) {
        return new UsernamePasswordAuthenticationToken(user, password);
      } 
      else {
        throw new BadCredentialsException("Invalid password!");
      }
    } 
    else {
    	throw new BadCredentialsException("No user registered with this username!");
    }
  }

  @Override
  public boolean supports(Class<?> authentication) {
      return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
  }
}