package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.User;

@Service
public interface UserService {
	public boolean signUpUser(User user);
	public boolean loginUser(User user, String password);
	public boolean existsByEmail(String email);
	public boolean existsByUsername(String username);
	public boolean verifyPassword(String plainPassword, String hashedPassword);
  
	public User findByUsername(String username);
  public User findByEmail(String email);

  public List<User> getAllUsers();
}
