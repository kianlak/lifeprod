package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long> {

}
