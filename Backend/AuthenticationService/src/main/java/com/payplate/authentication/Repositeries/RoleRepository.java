package com.payplate.authentication.Repositeries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payplate.authentication.Entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {

}
