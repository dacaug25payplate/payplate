package com.payplate.authentication.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.authentication.Entities.Role;
import com.payplate.authentication.Repositeries.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository  roleRepository;

	
	//service to get all role
	public List<Role> getAllRole()
	{
		return roleRepository.findAll();
	}

	//service to get role for id 
	public Role getRole(int id)
	{
		Role role = null;
		Optional <Role> op = roleRepository.findById(id);
		if( op != null)
		{
			try {

				role = op.get();
			}catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		return role;
	}

}
