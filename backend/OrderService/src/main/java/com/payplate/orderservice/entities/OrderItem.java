package com.payplate.orderservice.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="orderitemid")
	private int orderitemid;
	
	@Column(name="orderid")
	private int orderid;
	
	@Column(name="menud")
	private int menud;

	@Column(name="quantity")
	private int quantity;
	
	@Column(name="totaldishprice")
	private double totaldishprice;
}
