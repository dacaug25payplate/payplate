package com.payplate.orderservice.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.orderservice.entities.ServingTable;
import com.payplate.orderservice.repositories.OrderItemRepository;
import com.payplate.orderservice.repositories.OrderRepository;
import com.payplate.orderservice.repositories.OrderStatusRepository;
import com.payplate.orderservice.repositories.ServingTableRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderService {
	@Autowired
	OrderRepository orderrepo;
	
	@Autowired
	OrderItemRepository orderitemrepo;
	
	@Autowired
	OrderStatusRepository orderstatusrepo;
	
	@Autowired
	ServingTableRepository servingtablerepo;
	
	
	public List<ServingTable> getAllServingTables()
	{
		return servingtablerepo.findByStatus("available");
	}
}
