package com.jpaksuniemi.notes.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.jpaksuniemi.notes.model.Note;
import com.jpaksuniemi.notes.model.User;
import com.jpaksuniemi.notes.service.AuthService;
import com.jpaksuniemi.notes.service.NoteService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    
    @Autowired
    private AuthService authService;

    @GetMapping
    public List<Note> getAllNotes(HttpServletRequest request) {
        User user = authService.getAuthenticatedUser(request);
        return noteService.getAllNotesByUser(user.getUsername());
    } 

    @PostMapping
    public ResponseEntity<?> postNewNote(HttpServletRequest request, @RequestBody Note note) {
        System.out.println(note);
        User owner = authService.getAuthenticatedUser(request);
        note.setUser(owner);
        noteService.createNote(note);
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(HttpServletRequest request, @PathVariable Integer id) {
        User user = authService.getAuthenticatedUser(request);
        if (!noteService.isOwnerOfNote(user.getUsername(), id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found");
        }
        noteService.removeNote(id);
        return ResponseEntity.ok().body(Map.of("message", "Note deleted succesfully!"));
    }
}
