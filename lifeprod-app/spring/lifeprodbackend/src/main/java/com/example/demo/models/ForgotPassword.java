package com.example.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PASSWORD_TOKENS")
public class ForgotPassword {
	@Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  
	@Column(unique = true, nullable = false)
	private String email;
  
  @Column(unique = true, nullable = false)
  private String token;
  
  @Column(nullable = false)
  private LocalDateTime expirationDate;
  
  public ForgotPassword(Long id, String email, String token, LocalDateTime expirationDate) {
		super();
		this.id = id;
		this.email = email;
		this.token = token;
		this.expirationDate = expirationDate;
	}
  
	public LocalDateTime getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDateTime expirationDate) {
		this.expirationDate = expirationDate;
	}

	public ForgotPassword() {};

	@Override
	public String toString() {
		return "ForgotPassword [id=" + id + ", email=" + email + ", token=" + token+ ", expiration date=" + expirationDate + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
