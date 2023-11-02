package com.example.demo.repositories;

import com.example.demo.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByEmail(String email);
  boolean existsByUsername(String username);
  
  User findByUsername(String username);
}