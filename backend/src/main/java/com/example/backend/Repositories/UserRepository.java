package com.example.backend.Repositories;

import com.example.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    <S extends User> S save(S user);
}