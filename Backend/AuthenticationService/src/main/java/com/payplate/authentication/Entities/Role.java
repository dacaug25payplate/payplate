package com.payplate.authentication.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "role")
public class Role {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "roleid")
	private int roleid;
	
	@Column(name ="rolename")
	private String rolename;

	public int getRoleId() {
		return roleid;
	}

	public void setRoleId(int roleid) {
		this.roleid = roleid;
	}

	public String getRoleName() {
		return rolename;
	}

	public void setRoleName(String roleName) {
		this.rolename = roleName;
	}

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Role(int roleId, String roleName) {
		super();
		this.roleid = roleId;
		this.rolename = roleName;
	}

	

	
	
}
