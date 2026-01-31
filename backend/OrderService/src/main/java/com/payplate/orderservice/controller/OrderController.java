package com.payplate.orderservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payplate.orderservice.entities.Orders;
import com.payplate.orderservice.entities.ServingTable;
import com.payplate.orderservice.services.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/confirm")
    public Orders confirmOrder(@RequestBody Orders order) {
        return orderService.confirmOrder(order);
    }
    
    @GetMapping("/servingTables")
    public List<ServingTable> getAllServingTables() {
        return orderService.getAllTables();
    }
}

