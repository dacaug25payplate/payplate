package com.payplate.orderservice.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.orderservice.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	Optional<OrderItem> findByOrders_OrderidAndMenuid(int orderid, int menuid);

	List<OrderItem> findByOrders_Orderid(int orderid);
}
