package com.payplate.orderservice.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="orderid")
	private int orderid;
	
	@Column(name="userid")
	private int userid;
	
	@Column(name="tableid")
	private int tableid;
	
	@Column(name="orderstatusid")
	private int orderstatusid;
	
	@Column(name="orderdatetime")
	private Date orderdatetime;
	
	@Column(name="totalamount")
	private double totalamount;
	
	
}
