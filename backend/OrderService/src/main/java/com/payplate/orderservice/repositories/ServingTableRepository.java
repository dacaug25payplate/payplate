package com.payplate.orderservice.repositories;

<<<<<<< HEAD
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payplate.orderservice.entities.ServingTable;

@Repository
public interface ServingTableRepository extends JpaRepository<ServingTable, Integer> {
	List<ServingTable> findByStatus(String status);

}
=======
import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.orderservice.entities.ServingTable;

public interface ServingTableRepository extends JpaRepository<ServingTable, Integer> {
	
}

>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
