package com.payplate.orderservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.orderservice.entities.ServingTable;

public interface ServingTableRepository extends JpaRepository<ServingTable, Integer> {
	
}

