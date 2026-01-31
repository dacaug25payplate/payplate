package com.payplate.orderservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payplate.orderservice.entities.ServingTable;
import com.payplate.orderservice.repositories.OrderRepository;
import com.payplate.orderservice.services.OrderService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
	@Autowired
	OrderService orderservice;
	
	@Autowired
	OrderRepository orderrepo;
	
	
	@GetMapping("/getAllServingTables")
	public List<ServingTable> getAllServingTables()
	{
		return orderservice.getAllServingTables();
	}
	
//	@PostMapping("/order")
//	public ResponseEntity<String> saveOrder(@RequestParam("orderid")int orderid,
//			@RequestParam int userid,
//			@RequestParam int tableid,
//			@RequestParam int orderstatusid,
//			@RequestParam Date orderdatetime,
//			@RequestParam double totalamount){
//		try {
//			
////			Order order = orderservice.getByUserId(userid);
//
////	        orderrepo.save(order);
//
//			
//		}
//		catch(Exception e) {
//			e.printStackTrace();
//			return ResponseEntity.badRequest().body("Failed to save order");
//		}
//		
//		
//		return ResponseEntity.ok("Order placed successfully");
//	}
	
}

