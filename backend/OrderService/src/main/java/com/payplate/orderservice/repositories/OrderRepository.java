package com.payplate.orderservice.repositories;

<<<<<<< HEAD


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payplate.orderservice.entities.Order;


@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
//	List<Order> findByTableId(int tableid);
	
	
}
=======
import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.orderservice.entities.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer> {
	
}

>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
