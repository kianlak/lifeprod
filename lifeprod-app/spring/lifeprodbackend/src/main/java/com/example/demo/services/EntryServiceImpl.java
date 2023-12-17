package com.example.demo.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Entry;
import com.example.demo.repositories.EntryRepository;

@Service
public class EntryServiceImpl implements EntryService {
	@Autowired
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
		
  private final EntryRepository entryRepository;

  public EntryServiceImpl(EntryRepository entryRepository) {
    this.entryRepository = entryRepository;
  }

  public List<Entry> getAllEntries() {
		return entryRepository.findAll();
	}
  
  public boolean submitEntry(Entry entry) {
  	LOGGER.info("\u001B[36m Attempting to Save Entry... \u001B[0m");
  	
  	try {
  		entryRepository.save(entry);
      LOGGER.info("\u001B[32m SUCCESS: Saved entry\u001B[0m");
      return true;
    } catch (Exception e) {
      LOGGER.error("\u001B[31m ERROR: Could not save entry\u001B[0m", e);
      return false;
    }
  }
}
