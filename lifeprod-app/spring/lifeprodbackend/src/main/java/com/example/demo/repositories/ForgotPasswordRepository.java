package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.ForgotPassword;


public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long>{
  ForgotPassword findByEmail(String email);
}
