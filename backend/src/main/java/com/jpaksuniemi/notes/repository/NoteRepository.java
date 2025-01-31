package com.jpaksuniemi.notes.repository;

import org.springframework.data.repository.CrudRepository;

import com.jpaksuniemi.notes.model.Note;

public interface NoteRepository extends CrudRepository<Note, Integer> {}
