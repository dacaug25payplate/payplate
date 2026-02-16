# 🍽️ PayPlate – Restaurant Billing & Order Management System

**PayPlate** is a full-stack **Restaurant Billing & Order Management System** built using:

* ⚛️ React.js + Redux + React Router
* ☕ Spring Boot Microservices
* 🔷 C# .NET Services
* 🗄️ MySQL Relational Database (Single Shared DB)
* 🌐 API Gateway & Discovery Server

The system digitizes restaurant operations including menu browsing, ordering, billing, and staff workflow with real-time order tracking.

---

## 🚀 Features

* Secure login with role-based access (Admin, Customer, Cook, Waiter)
* Digital menu browsing with categories & images
* Cart-based order placement
* Real-time order status updates
* Automatic bill generation with tax & discounts
* Feedback system
* Table management
* Central API Gateway routing
* Microservices-based backend

---

## 👥 User Roles

### 👑 Admin

* Manage staff accounts
* Manage menu & categories
* View orders and generate bills
* Apply discounts
* View feedback

### 👨‍🍳 Staff (Cook / Waiter)

* Login & view orders
* Update preparation/delivery status

### 🧑 Customer

* Register/login
* Browse menu
* Add to cart
* Place orders
* Track order status
* Give feedback

---

## 🏗️ Architecture

```
React Frontend
      ↓
API Gateway
      ↓
Spring Boot / .NET Microservices
      ↓
Single Shared MySQL Database
```

* **Discovery Server:** Handles service registration & lookup
* **API Gateway:** Routes client requests to correct service
* **Database:** Single relational database used by all services

---

## 🗄️ Database Schema (Actual Tables)

### 👤 User & Security

* `user` → user info, role, security question
* `role` → Admin / User / Cook / Waiter
* `question` → password recovery questions

### 🍽️ Menu Management

* `menu` → dishes with price, image, category, subcategory
* `category` → veg / nonveg
* `subcategory` → starter, main course, beverages etc.

### 🛒 Orders & Billing

* `orders` → order details, user, table, status, amount
* `orderitem` → dishes inside each order
* `orderstatus` → PENDING, READY, IN_PREPARATION, DELIVERED
* `bills` → generated bill with tax, discount, net amount
* `discount` → discount rules

### 🏢 Restaurant Operations

* `servingtable` → table availability
* `feedback` → customer rating & comments

---

## ⚙️ Database Setup

```sql
CREATE DATABASE payplate_db;
USE payplate_db;
```

```bash
mysql -u root -p payplate_db < payplate_db.sql
```

Ensure MySQL is running and credentials are configured in backend services.

---

## ⚙️ Project Setup

### Clone repository

```bash
git clone https://github.com/dacaug25payplate/payplate.git
cd payplate
```

### Start Backend Services (order matters)

1. Discovery Server
2. API Gateway
3. Spring Boot services
4. .NET services

```bash
mvn spring-boot:run
dotnet run
```

### Start Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📡 Request Flow

```
User → React UI → API Gateway → Microservice → MySQL DB → Response → UI
```

---

# 🖼️ Application Screenshots

## 🔐 Login Page

![Login](screenshots/login.png)

## 👑 Admin Dashboard – Menu Management

![Admin Menu](screenshots/admin-menu.png)

## 💸 Admin – Discount Management

![Discount](screenshots/admin-discount.png)

## 👥 Admin – Staff Management

![Staff](screenshots/admin-staff.png)

## 📦 Admin – Orders & Bill Generation

![Orders](screenshots/admin-orders.png)

## ⭐ Admin – Customer Feedbacks

![Feedback](screenshots/feedback.png)

## 🍽️ Customer Menu View

![Customer Menu](screenshots/customer-menu.png)

## 👨‍🍳 Kitchen Orders – Cook Dashboard

![Kitchen](screenshots/kitchen-orders.png)

## 🧾 Invoice / Billing Screen

![Invoice](screenshots/invoice.png)

## 🗺️ Database ER Diagram

![ER Diagram](screenshots/er-diagram.png)

---

## 🧪 Testing

* Unit testing for backend modules
* API testing using Postman
* Integration testing between services
* Frontend validation
* End-to-end manual testing

---

## 🔮 Future Enhancements

* Online payments (UPI / Cards)
* Analytics dashboard
* Inventory system
* QR-based ordering
* Cloud deployment & Docker

---

## 👨‍💻 Authors

**Anurag Yadav**
**Sujit Wandre**
**Digvijay Kapurkar**

---
