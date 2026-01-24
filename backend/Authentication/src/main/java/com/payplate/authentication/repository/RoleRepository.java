package com.payplate.authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.authentication.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {}
