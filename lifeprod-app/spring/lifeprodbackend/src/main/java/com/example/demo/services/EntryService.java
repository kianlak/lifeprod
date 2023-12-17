package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Entry;

@Service
public interface EntryService {
	public List<Entry> getAllEntries();
	
	public boolean submitEntry(Entry entry);
}