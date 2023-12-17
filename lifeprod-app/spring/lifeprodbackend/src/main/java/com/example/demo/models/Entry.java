package com.example.demo.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ENTRIES")
public class Entry {
	@Id
  @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private Long userId;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private String category;
	
	@Column(nullable = false)
	private Date date;
	
	@Column(nullable = false)
	private int time;
	
	protected Entry() {};
	
	public Entry(Long id, Long userId, String title, String description, String category, Date date, int time) {
		super();
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.description = description;
		this.category = category;
		this.date = date;
		this.time = time;
	}
	
	@Override
	public String toString() {
		return "Entry [id=" + id + ", userId=" + userId + ", title=" + title + ", description=" + description
				+ ", category=" + category + ", date=" + date + ", time=" + time + "]";
	}

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}
}