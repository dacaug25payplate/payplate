package com.payplate.orderservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

import com.payplate.orderservice.entities.OrderItem;


@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

=======

import com.payplate.orderservice.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	
>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
}
