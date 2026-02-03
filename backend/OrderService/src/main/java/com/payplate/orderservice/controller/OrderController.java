package com.payplate.orderservice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payplate.orderservice.entities.OrderStatus;
import com.payplate.orderservice.entities.Orders;
import com.payplate.orderservice.entities.ServingTable;
import com.payplate.orderservice.services.OrderService;

import jakarta.transaction.Transactional;

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
    
    //endpoint to get order 
    @GetMapping("/kitchen")
    public List<Map<String, Object>> getKitchenOrders() {
        return orderService.getKitchenOrders();
    }
    
    //endpoint to get all orderstatus
    @GetMapping("/getAllOrderStatus")
    public List<OrderStatus> getAllOrderStatus()
    {
    	return orderService.getAllOrderStatus();
    }
    
    @GetMapping("/user/{userid}")
    public List<Map<String, Object>> getOrdersByUser(@PathVariable int userid) {
        return orderService.getOrdersByUser(userid);
    }
    
    //method to update order
    @PostMapping("/update")
    public void updateOrder(@RequestBody Map<String, Object> data) {
        orderService.updateOrder(data);
    }
  
    @PutMapping("/updateStatus")
    public void updateOrderStatus(@RequestBody Map<String, Integer> data) {
        orderService.updateOrderStatus(
            data.get("orderid"),
            data.get("orderstatusid")
        );
    }
    
    @GetMapping("/{orderid}")
    public Orders getOrderById(@PathVariable int orderid) {
        return orderService.getOrderById(orderid);
    }
    
    @PutMapping("/release-table/{orderId}")
    public void releaseTable(@PathVariable int orderId) {
        orderService.releaseTable(orderId);
    }



}

