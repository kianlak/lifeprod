package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/csrf")
public class CrsfController {
	@GetMapping("/get")
  public ResponseEntity<String> getCsrfToken() {
		return ResponseEntity.status(HttpStatus.ACCEPTED)
			.body("Token has carried over");
  }
}
