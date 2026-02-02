package com.payplate.orderservice.entities;



import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private int userId;
    private int tableId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderStatusId", nullable = false)
    private OrderStatus orderStatus;

    private double totalAmount;

    private LocalDateTime dateandTime;

    // getters & setters
    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getTableId() { return tableId; }
    public void setTableId(int tableId) { this.tableId = tableId; }

    public OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getDateandTime() { return dateandTime; }
    public void setDateandTime(LocalDateTime dateandTime) { this.dateandTime = dateandTime; }
}
