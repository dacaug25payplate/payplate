package com.payplate.orderservice.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orderitem")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderitemid;

    private int menuid;
    private int quantity;
    private double totaldishprice;

    @ManyToOne
    @JoinColumn(name = "orderid")
    @JsonBackReference
    private Orders orders;

	public int getOrderitemid() {
		return orderitemid;
	}

	public void setOrderitemid(int orderitemid) {
		this.orderitemid = orderitemid;
	}

	public int getMenuid() {
		return menuid;
	}

	public void setMenuid(int menuid) {
		this.menuid = menuid;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotaldishprice() {
		return totaldishprice;
	}

	public void setTotaldishprice(double totaldishprice) {
		this.totaldishprice = totaldishprice;
	}

	public Orders getOrders() {
		return orders;
	}

	public void setOrders(Orders orders) {
		this.orders = orders;
	}


    
}

