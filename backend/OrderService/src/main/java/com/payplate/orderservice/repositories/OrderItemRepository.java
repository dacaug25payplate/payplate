package com.payplate.orderservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.orderservice.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	
}
