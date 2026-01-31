package com.payplate.orderservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orderstatus")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderstatusid;

    private String statusname;

	public int getOrderstatusid() {
		return orderstatusid;
	}

	public void setOrderstatusid(int orderstatusid) {
		this.orderstatusid = orderstatusid;
	}

	public String getStatusname() {
		return statusname;
	}

	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}

    
}

