package com.payplate.authentication.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payplate.authentication.Entities.User;
import com.payplate.authentication.Services.UserService;

@RestController
@RequestMapping("/User")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/getAllUser")
	public List<User> getAllUser()
	{
		return userService.gerAllUser();
	}
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable("id") int userId )
	{
		return  userService.getUser(userId);
	}
	
	@GetMapping("/name/{username}")
	public User getUserByName(@PathVariable("username") String userName)
	{
		return userService.getUserByName(userName);
	}

	@PostMapping("/save")
	public void SaveUser(@RequestBody User user)
	{
		userService.saveUser(user);
	}
}
