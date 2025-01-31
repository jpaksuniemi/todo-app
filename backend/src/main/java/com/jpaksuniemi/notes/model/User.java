package com.jpaksuniemi.notes.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    @Column(name = "user_id")
    private Integer id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user")
    private Collection<Note> notes = new ArrayList<Note>();

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    private User() {}

    public Integer getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }
}
