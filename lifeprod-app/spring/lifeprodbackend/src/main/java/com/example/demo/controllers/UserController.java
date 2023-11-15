package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // Removing later
  @GetMapping("/all")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @PostMapping("/signup")
  public ResponseEntity<String> signUpUser(@RequestBody User user) {
    if (userService.existsByUsername(user.getUsername()) || userService.existsByEmail(user.getEmail())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body("A user with this username or email already exists");
    }

    boolean signUpSuccess = userService.signUpUser(user);
    
    if (signUpSuccess) {
      return ResponseEntity.status(HttpStatus.CREATED)
        .body(userService.findByUsername(user.getUsername()).getId().toString());	// Returns the new user's id
    } 
    else {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    		.body("Failed to register user");
    }
  }
  
  @PostMapping("/login")
  public ResponseEntity<String> loginUser(@RequestBody User user) {
  	User existingUser = userService.findByUsername(user.getUsername());
  	
  	boolean loginSuccess = userService.loginUser(existingUser, user.getPassword());
  	
    if (loginSuccess) {
      return ResponseEntity.ok(existingUser.getId().toString());	// Returns the user's id
    } 
    else {
      return ResponseEntity.status(401)
      	.body("Invalid username or password");
    }
  }
}
