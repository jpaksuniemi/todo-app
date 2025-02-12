package com.jpaksuniemi.notes.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        Optional<User> user = userService.findByUsername(loginUser.getUsername());
        System.out.println(user.get() + loginUser.toString() + " ispresent: " + user.isPresent());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            String token = jwtUtil.generateToken(loginUser.getUsername());
            return ResponseEntity.ok().body(
                Map.of("username", user.get().getUsername(),
                       "token", token));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials!"));
        }
    }
}
