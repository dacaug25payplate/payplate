package com.payplate.orderservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payplate.orderservice.entities.Orders;


public interface OrderRepository extends JpaRepository<Orders, Integer> {
	
	@Query(value = """
			select 
			  o.orderid,
			  o.tableid,
			  os.statusname,
			  m.menuname,
			  oi.quantity
			from orders o
			join orderstatus os on o.orderstatusid = os.orderstatusid
			join orderitem oi on o.orderid = oi.orderid
			join menu m on oi.menuid = m.menuid
			where os.statusname in ('PENDING','IN_PREPARATION','READY')
			order by o.orderdatetime desc
			""", nativeQuery = true)
	List<Object[]> getKitchenOrders();
	
	//to get order on the basis or order
	List<Orders> findByUserid(int userid);
	
}

