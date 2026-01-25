package com.payplate.authentication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.authentication.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	
	List<Role> findByRoleidIn(List<Integer> roleids);
}
