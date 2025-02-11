package com.jpaksuniemi.notes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jpaksuniemi.notes.model.Note;
import com.jpaksuniemi.notes.model.User;
import com.jpaksuniemi.notes.repository.NoteRepository;
import com.jpaksuniemi.notes.repository.UserRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Note> getAllNotesByUser(String username) {
        Optional<User> owner = userRepository.findByUsername(username);
        if (owner.isPresent()) {
            return noteRepository.findByUser(owner.get());
        }
        return new ArrayList<Note>();
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public void removeNote(Integer id) {
        noteRepository.deleteById(id);
    }

    public boolean isOwnerOfNote(String username, Integer noteId) {
        Optional<User> owner = userRepository.findByUsername(username);
        if (owner.isPresent()) {
            return noteRepository.findByUser(owner.get()).stream()
                    .anyMatch(note -> note.getId().equals(noteId));
        }
        return false;
    }
}
