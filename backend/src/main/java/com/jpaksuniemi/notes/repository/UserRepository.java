package com.jpaksuniemi.notes.repository;

import org.springframework.data.repository.CrudRepository;

import com.jpaksuniemi.notes.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {}
