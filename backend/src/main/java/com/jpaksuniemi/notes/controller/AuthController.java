package com.jpaksuniemi.notes.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jpaksuniemi.notes.model.User;
import com.jpaksuniemi.notes.service.UserService;
import com.jpaksuniemi.notes.util.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        Optional<User> user = userService.findByUsername(loginUser.getUsername());
        if (user.isPresent() && user.get().getPassword() == loginUser.getPassword()) {
            String token = jwtUtil.generateToken(loginUser.getUsername());
            return ResponseEntity.ok().body(
                Map.of("username", user.get().getUsername(),
                       "token", token));
        } else {
            return ResponseEntity.badRequest().body(Map.of("username", "Invalid credentials!", "token", ""));
        }
    }
}
