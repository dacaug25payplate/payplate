package com.payplate.orderservice.services;

<<<<<<< HEAD

=======
import java.time.LocalDateTime;
>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
<<<<<<< HEAD

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
=======
import org.springframework.transaction.annotation.Transactional;

import com.payplate.orderservice.entities.OrderItem;
import com.payplate.orderservice.entities.Orders;
import com.payplate.orderservice.entities.ServingTable;
import com.payplate.orderservice.repositories.OrderRepository;
import com.payplate.orderservice.repositories.ServingTableRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ServingTableRepository servingTableRepository;

    @Transactional
    public Orders confirmOrder(Orders order) {

        // 1. Backend-controlled fields
        order.setOrderdatetime(LocalDateTime.now());
        order.setOrderstatusid(1); // PENDING
        order.setTotalamount(0.0);

        // 2. Calculate total amount
        double total = 0.0;
        for (OrderItem item : order.getOrderItems()) {
            item.setOrders(order);
            total += item.getTotaldishprice();
        }
        order.setTotalamount(total);

        // 3. Save order + items
        Orders savedOrder = orderRepository.save(order);

        // 4. Mark table as OCCUPIED
        ServingTable table = servingTableRepository
                .findById(order.getTableid())
                .orElseThrow();

        table.setStatus("OCCUPIED");
        servingTableRepository.save(table);

        return savedOrder;
    }


    public List<ServingTable> getAllTables() {
        return servingTableRepository.findAll();
    }
}


>>>>>>> 830d3b5fc5925e8a089516352d4491b8aa499563
