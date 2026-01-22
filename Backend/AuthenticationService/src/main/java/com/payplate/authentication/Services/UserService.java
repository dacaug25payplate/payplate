package com.payplate.authentication.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.authentication.Entities.User;
import com.payplate.authentication.Repositeries.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	//service for get all user
	public List<User> gerAllUser()
	{
		return userRepository.findAll();
	}

	//service for get user by id
	public User getUser(int id)
	{
		User user = null;
		Optional<User> op =  userRepository.findById(id);
		if(op != null)
		{
			try {
				user = op.get();
			}catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		return user;
	}

	//service for getUser by name
	public User getUserByName(String userName) {
		User user = null;
		Optional <User> op = userRepository.findByUserName(userName);
		if(op != null)
		{
			try {
				user = op.get();
			}catch(Exception e)
			{
				e.printStackTrace();
			}
		}

		return user;

	}

	//service for saving user data 
	public void saveUser(User user) {	
		userRepository.save(user);
	}
}
