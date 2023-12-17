package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Entry;
import com.example.demo.services.EntryService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/entry")
public class EntryController {
	private final EntryService entryService;

  public EntryController(EntryService entryService) {
    this.entryService = entryService;
  }
  
	@PostMapping("/submit")
	public ResponseEntity<String> submitEntry(@RequestBody Entry entry) {
		boolean submissionStatus = entryService.submitEntry(entry);
		
		return submissionStatus ?
			ResponseEntity.status(HttpStatus.ACCEPTED).body("Entry submitted") :
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit entry");
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Entry>> getAllEntries() {
    List<Entry> entries = entryService.getAllEntries();
    return ResponseEntity.ok(entries);
  }
}