package com.example.demo.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.constants.SecurityConstants;
import com.example.demo.filters.CsrfCookieFilter;

@Configuration
public class SecurityConfig {
	@Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
		requestHandler.setCsrfRequestAttributeName("_csrf");
		
    http
	  	.securityContext((context) -> context.requireExplicitSave(false))
	  	.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
	  	.cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource()))
	  	.csrf((csrf) -> csrf
  			.csrfTokenRequestHandler(requestHandler)
  			.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
	  	.addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class) 
      .authorizeHttpRequests((requests) -> requests
	      .requestMatchers("/api/user/all").authenticated()
	      .requestMatchers(
      		"/api/user/all",
      		"/api/user/signup"
	      ).permitAll())
      .formLogin(Customizer.withDefaults())
      .httpBasic(Customizer.withDefaults());
    
    return http.build();
  }
	
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
        
    config.setAllowedOrigins(Arrays.asList(
  		SecurityConstants.PERMITTED_HTTP_PATHS.toArray(new String[0])
    ));
    config.setAllowedMethods(Collections.singletonList("*"));
    config.setAllowCredentials(true);
    config.setAllowedHeaders(Collections.singletonList("*"));
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}