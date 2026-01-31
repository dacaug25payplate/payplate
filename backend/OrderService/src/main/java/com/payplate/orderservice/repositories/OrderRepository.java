package com.payplate.orderservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.orderservice.entities.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer> {
	
}

