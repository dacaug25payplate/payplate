package com.payplate.orderservice.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.payplate.orderservice.entities.OrderItem;
import com.payplate.orderservice.entities.OrderStatus;
import com.payplate.orderservice.entities.Orders;
import com.payplate.orderservice.entities.ServingTable;
import com.payplate.orderservice.repositories.OrderItemRepository;
import com.payplate.orderservice.repositories.OrderRepository;
import com.payplate.orderservice.repositories.OrderStatusRepository;
import com.payplate.orderservice.repositories.ServingTableRepository;

import jakarta.persistence.criteria.Order;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ServingTableRepository servingTableRepository;

	@Autowired
	private OrderStatusRepository orderStatusRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

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


	//method for get all orders
	public List<Map<String, Object>> getKitchenOrders() {

		List<Object[]> rows = orderRepository.getKitchenOrders();
		Map<Integer, Map<String, Object>> orderMap = new LinkedHashMap<>();

		for (Object[] r : rows) {
			int orderId = ((Number) r[0]).intValue();

			orderMap.putIfAbsent(orderId, new HashMap<>());
			Map<String, Object> order = orderMap.get(orderId);

			order.putIfAbsent("orderId", orderId);
			order.putIfAbsent("tableId", r[1]);
			order.putIfAbsent("status", r[2]);
			order.putIfAbsent("items", new ArrayList<>());

			List<Map<String, Object>> items =
					(List<Map<String, Object>>) order.get("items");

			Map<String, Object> item = new HashMap<>();
			item.put("menuName", r[3]);
			item.put("quantity", r[4]);

			items.add(item);
		}

		return new ArrayList<>(orderMap.values());
	}


	//get all order status 
	public List<OrderStatus> getAllOrderStatus() {
		return orderStatusRepository.findAll();
	}

	//get order by user id
	public List<Map<String, Object>> getOrdersByUser(int userid) {

		List<Orders> orders = orderRepository.findByUserid(userid);
		List<Map<String, Object>> result = new ArrayList<>();

		for (Orders o : orders) {
			OrderStatus status = orderStatusRepository
					.findById(o.getOrderstatusid())
					.orElse(null);

			Map<String, Object> map = new HashMap<>();
			map.put("orderid", o.getOrderid());
			map.put("tableid", o.getTableid());
			map.put("orderdatetime", o.getOrderdatetime());
			map.put("totalamount", o.getTotalamount());
			map.put("orderItems", o.getOrderItems());
			map.put("statusname", status != null ? status.getStatusname() : "PENDING");

			result.add(map);
		}

		return result;
	}


	//update method when user add new dish or quantity in old order
	@Transactional
	public void updateOrder(Map<String, Object> data) {

		int orderid = (int) data.get("orderid");
		int menuid = (int) data.get("menuid");
		int quantityChange = (int) data.get("quantity");

		Orders order = orderRepository.findById(orderid)
				.orElseThrow(() -> new RuntimeException("Order not found"));

		Optional<OrderItem> optItem =
				orderItemRepository.findByOrders_OrderidAndMenuid(orderid, menuid);

		if (optItem.isPresent()) {
			// ===== EXISTING ITEM =====
			OrderItem item = optItem.get();
			int newQty = item.getQuantity() + quantityChange;

			if (newQty <= 0) {
				orderItemRepository.delete(item);
			} else {
				double unitPrice =
						item.getTotaldishprice() / item.getQuantity();

				item.setQuantity(newQty);
				item.setTotaldishprice(newQty * unitPrice);
				orderItemRepository.save(item);
			}

		} else {
			// ===== NEW ITEM =====
			if (!data.containsKey("price")) {
				throw new RuntimeException("Price required for new item");
			}

			double unitPrice = ((Number) data.get("price")).doubleValue();
			int qty = Math.max(quantityChange, 1);

			OrderItem item = new OrderItem();
			item.setOrders(order);
			item.setMenuid(menuid);
			item.setQuantity(qty);
			item.setTotaldishprice(qty * unitPrice);

			orderItemRepository.save(item);
		}

		// ===== UPDATE ORDER TOTAL =====
		double total = orderItemRepository
				.findByOrders_Orderid(orderid)
				.stream()
				.mapToDouble(OrderItem::getTotaldishprice)
				.sum();

		order.setTotalamount(total);
		orderRepository.save(order);
	}

	//update status method
	@Transactional
	public void updateOrderStatus(int orderid, int statusid) {
		Orders order = orderRepository.findById(orderid)
				.orElseThrow(() -> new RuntimeException("Order not found"));

		order.setOrderstatusid(statusid);
		orderRepository.save(order);
	}

}


