package com.payplate.authentication.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.authentication.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
    Optional<User> findByUsername(String username);

    List<User> findByRole_RoleidIn(List<Integer> roleids);
    
    boolean existsByUsername(String username);

}

