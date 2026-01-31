package com.payplate.orderservice.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

	@ManyToOne
	@JoinColumn(name="tableid")
	private ServingTable table;
	
	@ManyToOne
	@JoinColumn(name="orderstatusid")
	private OrderStatus status;
	
	@Column(name="orderdatetime")
	private Date orderdatetime;
	
	@Column(name="totalamount")
	private double totalamount;
	

	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}


	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public ServingTable getTable() {
		return table;
	}

	public void setTable(ServingTable table) {
		this.table = table;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Date getOrderdatetime() {
		return orderdatetime;
	}

	public void setOrderdatetime(Date orderdatetime) {
		this.orderdatetime = orderdatetime;
	}

	public double getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(double totalamount) {
		this.totalamount = totalamount;
	}
	
}
