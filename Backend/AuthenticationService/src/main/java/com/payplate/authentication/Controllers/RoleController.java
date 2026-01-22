package com.payplate.authentication.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payplate.authentication.Entities.Role;
import com.payplate.authentication.Services.RoleService;

@RestController
@RequestMapping("/Role")
public class RoleController {
	
	@Autowired
	RoleService roleservice ;
	
	@GetMapping("/getAllRole")
	public List<Role> getAllRole()
	{
		return roleservice.getAllRole();
	}
	
	@GetMapping("/{id}")
	public Role getRole(@PathVariable int id)
	{
		return roleservice.getRole(id);
	}

}
