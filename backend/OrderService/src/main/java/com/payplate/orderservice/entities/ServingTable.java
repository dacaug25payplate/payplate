package com.payplate.orderservice.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="servingtable")
public class ServingTable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tableid")
	private int tableid;
	
	@Column(name="status")
	private String status;
	
	
}
