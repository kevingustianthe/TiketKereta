package com.sosd.tiketkereta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sosd.tiketkereta.model.User;

public interface AdminRepository extends JpaRepository<User, Integer> {

}
