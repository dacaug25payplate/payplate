package com.payplate.orderservice.entities;

<<<<<<< HEAD
import jakarta.persistence.Column;
=======
>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
<<<<<<< HEAD
@Table(name="orderstatus")
public class OrderStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="orderstatusid")
	private int orderstatusid;
	
	@Column(name="statusname")
	private String statusname;
}
=======
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

>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
