package com.jpaksuniemi.notes.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jpaksuniemi.notes.model.Note;
import com.jpaksuniemi.notes.service.NoteService;
import com.jpaksuniemi.notes.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private NoteService noteService;
    private JwtUtil jwtUtil;

    public NoteController(NoteService noteService, JwtUtil jwtUtil) {
        this.noteService = noteService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<?> getAllNotes(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null ||!token.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("message", "Missing or invalid token!"));
        }
        token = token.substring(7);
        String username = jwtUtil.extractUsername(token);

        if (jwtUtil.validateToken(token, username)) {
            List<Note> notes = noteService.getAllNotesByUser(username); 
            return ResponseEntity.ok(notes);
        } else {
            return ResponseEntity.status(403).body(Map.of("message", "Invalid token!"));
        }
    } 

}
