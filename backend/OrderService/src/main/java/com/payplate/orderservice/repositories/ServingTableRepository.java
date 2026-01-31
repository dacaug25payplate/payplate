package com.payplate.orderservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payplate.orderservice.entities.ServingTable;

@Repository
public interface ServingTableRepository extends JpaRepository<ServingTable, Integer> {
	List<ServingTable> findByStatus(String status);

}
