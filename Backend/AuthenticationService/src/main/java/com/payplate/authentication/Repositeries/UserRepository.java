package com.payplate.authentication.Repositeries;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payplate.authentication.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	//Query Method to get user data by using name 
	Optional<User> findByUserName(String userName);

}
