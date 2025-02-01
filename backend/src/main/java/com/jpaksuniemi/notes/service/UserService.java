package com.jpaksuniemi.notes.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.jpaksuniemi.notes.model.User;
import com.jpaksuniemi.notes.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public boolean isUsernameAvailable(String username) {
        return userRepository.existsByUsername(username);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public ResponseEntity<?> createUser(User user) {
        System.out.println("user received " + user.getUsername());
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(409).body(Map.of("message", "Username already taken!"));
        }
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Registered succesfully"));
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

}
