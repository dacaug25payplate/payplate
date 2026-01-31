package com.payplate.orderservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

import com.payplate.orderservice.entities.OrderStatus;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {

}
=======

import com.payplate.orderservice.entities.OrderStatus;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
	
}

>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
