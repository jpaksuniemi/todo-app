package com.jpaksuniemi.notes.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.jpaksuniemi.notes.model.Note;
import com.jpaksuniemi.notes.model.User;

public interface NoteRepository extends CrudRepository<Note, Integer> {
    List<Note> findByUser(User user);
}
