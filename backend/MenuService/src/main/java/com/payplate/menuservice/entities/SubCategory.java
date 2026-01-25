package com.payplate.menuservice.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="subcategory")
public class SubCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="subcategoryid")
	private int subcategoryid;
	
	@Column(name="subcategoryname")
	private String subcategoryname;

	public int getSubcategoryid() {
		return subcategoryid;
	}

	public void setSubcategoryid(int subcategoryid) {
		this.subcategoryid = subcategoryid;
	}

	public String getSubcategoryname() {
		return subcategoryname;
	}

	public void setSubcategoryname(String subcategoryname) {
		this.subcategoryname = subcategoryname;
	}

	public SubCategory(int subcategoryid, String subcategoryname) {
		super();
		this.subcategoryid = subcategoryid;
		this.subcategoryname = subcategoryname;
	}

	public SubCategory() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
