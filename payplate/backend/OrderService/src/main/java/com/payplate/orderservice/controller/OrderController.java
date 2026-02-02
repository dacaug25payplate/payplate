package com.payplate.orderservice.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.payplate.orderservice.entities.*;
import com.payplate.orderservice.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PostMapping("/addItem/{orderId}")
    public OrderItem addItem(
            @PathVariable int orderId,
            @RequestBody OrderItem item) {
        return orderService.addItem(orderId, item);
    }

    @PutMapping("/updateStatus/{orderId}/{statusId}")
    public Order updateStatus(
            @PathVariable int orderId,
            @PathVariable int statusId) {
        return orderService.updateOrderStatus(orderId, statusId);
    }
}
