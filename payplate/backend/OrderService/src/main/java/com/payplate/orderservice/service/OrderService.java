package com.payplate.orderservice.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.orderservice.entities.Order;
import com.payplate.orderservice.entities.OrderItem;
import com.payplate.orderservice.entities.OrderStatus;
import com.payplate.orderservice.repository.OrderItemRepository;
import com.payplate.orderservice.repository.OrderRepository;
import com.payplate.orderservice.repository.OrderStatusRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    // ✅ Create Order
    public Order createOrder(Order order) {

        Optional<OrderStatus> statusOpt = orderStatusRepository.findById(1); // pending

        if (!statusOpt.isPresent()) {
            throw new RuntimeException("Order status not found");
        }

        order.setOrderStatus(statusOpt.get());
        order.setDateandTime(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // ✅ Add Item to Order
    public OrderItem addItem(int orderId, OrderItem item) {

        Optional<Order> orderOpt = orderRepository.findById(orderId);

        if (!orderOpt.isPresent()) {
            throw new RuntimeException("Order not found with id: " + orderId);
        }

        item.setOrder(orderOpt.get());
        return orderItemRepository.save(item);
    }

    // ✅ Update Order Status
    public Order updateOrderStatus(int orderId, int statusId) {

        Optional<Order> orderOpt = orderRepository.findById(orderId);
        Optional<OrderStatus> statusOpt = orderStatusRepository.findById(statusId);

        if (!orderOpt.isPresent()) {
            throw new RuntimeException("Order not found with id: " + orderId);
        }

        if (!statusOpt.isPresent()) {
            throw new RuntimeException("Order status not found with id: " + statusId);
        }

        Order order = orderOpt.get();
        order.setOrderStatus(statusOpt.get());

        return orderRepository.save(order);
    }
}
