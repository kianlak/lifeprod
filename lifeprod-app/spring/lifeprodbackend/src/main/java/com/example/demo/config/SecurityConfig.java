package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.demo.constants.SecurityConstants;
import com.example.demo.filters.CsrfCookieFilter;

@Configuration
public class SecurityConfig {
	@Autowired
  private CorsConfigurationSource corsConfigurationSource;

	@Bean
  PasswordEncoder passwordEncoder() {
  	return new BCryptPasswordEncoder();
  }
	
  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
  	CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
    requestHandler.setCsrfRequestAttributeName("_csrf");
    
    http
    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    .cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource))
    .csrf((csrf) -> csrf
    	.csrfTokenRequestHandler(requestHandler)
    	.ignoringRequestMatchers(SecurityConstants.OMITTED_CSRF_URLS.toArray(new String[0]))
    	.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
		)
    .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
  	.authorizeHttpRequests((requests) -> requests
			.requestMatchers(SecurityConstants.PERMITTED_ACCESS_CONTROL_URLS.toArray(new String[0])).permitAll()
			.requestMatchers(SecurityConstants.ACCESS_CONTROL_URLS.toArray(new String[0])).authenticated()
		)
    .formLogin(Customizer.withDefaults())
    .httpBasic(Customizer.withDefaults());
   
    return http.build();
  }
}