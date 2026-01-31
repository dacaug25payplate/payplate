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
@Table(name="servingtable")
public class ServingTable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tableid")
	private int tableid;
	
	@Column(name="status")
	private String status;
=======
@Table(name = "servingtable")
public class ServingTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tableid;

    private String status; // AVAILABLE / OCCUPIED
>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563

	public int getTableid() {
		return tableid;
	}

	public void setTableid(int tableid) {
		this.tableid = tableid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
<<<<<<< HEAD
	
}
=======

    
}

>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
