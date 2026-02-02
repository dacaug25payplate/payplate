package com.payplate.orderservice.repository;



import com.payplate.orderservice.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, Integer> {
}
