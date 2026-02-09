CREATE DATABASE  IF NOT EXISTS `payplate_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `payplate_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: payplate_db
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '228c7da4-b96f-11f0-8548-5fb159a94662:1-647';

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `billid` int NOT NULL AUTO_INCREMENT,
  `orderid` int NOT NULL,
  `generateddate` datetime NOT NULL,
  `billamount` double NOT NULL,
  `tax` double NOT NULL,
  `discountid` int DEFAULT NULL,
  `netamount` double NOT NULL,
  `paymentstatus` varchar(10) NOT NULL DEFAULT 'unpaid',
  PRIMARY KEY (`billid`),
  KEY `fk_bills_discount` (`discountid`),
  CONSTRAINT `fk_bills_discount` FOREIGN KEY (`discountid`) REFERENCES `discount` (`discountid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,22,'2026-02-03 20:16:05',380,19,NULL,399,'PAID'),(2,23,'2026-02-03 20:35:03',380,19,NULL,399,'PAID'),(3,24,'2026-02-03 21:27:01',380,19,NULL,399,'PAID'),(4,25,'2026-02-03 21:30:07',680,34,6,646,'PAID');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `categoryname` (`categoryname`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'nonveg'),(1,'veg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discountid` int NOT NULL AUTO_INCREMENT,
  `min_amt` double NOT NULL,
  `discount` double NOT NULL,
  `startdatetime` datetime DEFAULT NULL,
  `enddatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`discountid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES (6,500,10,'2026-02-03 21:27:00','2026-02-04 21:28:00');
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedbackid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `orderid` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `feedbackdate` datetime DEFAULT NULL,
  PRIMARY KEY (`feedbackid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (8,4,22,3,'best','2026-02-03 20:30:28'),(9,4,23,4,'best food.','2026-02-03 20:35:24'),(10,4,24,4,'best food.','2026-02-03 21:27:29'),(11,4,25,3,'nsad','2026-02-03 21:31:08');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menuid` int NOT NULL AUTO_INCREMENT,
  `menuname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `categoryid` int NOT NULL,
  `subcategoryid` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`menuid`),
  UNIQUE KEY `menuname` (`menuname`),
  KEY `categoryid` (`categoryid`),
  KEY `subcategoryid` (`subcategoryid`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`),
  CONSTRAINT `menu_ibfk_2` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Paneer Butter Masala','Soft paneer cubes cooked in rich buttery tomato gravy.',220,1,2,'/images/menu/1769495497571_Paneer_Butter_Masala.png'),(2,'Veg Manchurian','Fried vegetable balls tossed in spicy Chinese sauce.',160,1,1,'/images/menu/1769495724450_Veg_Manchurian.png'),(3,'Butter Naan','Soft tandoor-baked naan topped with butter',40,1,3,'/images/menu/1769495920791_Butter_Naan.png'),(4,'Chicken Biryani','Aromatic rice cooked with marinated chicken and spices.',240,2,2,'/images/menu/1769496061622_Chicken_Biryani.png'),(5,'Fish Fry','Crispy fried fish marinated with spices',220,2,1,'/images/menu/1769496483280_Fish_Fry.png');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `orderitemid` int NOT NULL AUTO_INCREMENT,
  `orderid` int NOT NULL,
  `menuid` int NOT NULL,
  `quantity` int NOT NULL,
  `totaldishprice` double NOT NULL,
  PRIMARY KEY (`orderitemid`),
  KEY `FKqyadddw5faraw73978ak51y4n` (`orderid`),
  CONSTRAINT `fk_orderItem_order` FOREIGN KEY (`orderid`) REFERENCES `Orders` (`orderid`),
  CONSTRAINT `FKqyadddw5faraw73978ak51y4n` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
INSERT INTO `orderitem` VALUES (1,22,1,1,220),(2,22,2,1,160),(3,23,1,1,220),(4,23,2,1,160),(5,24,1,1,220),(6,24,2,1,160),(7,25,1,1,220),(8,25,4,1,240),(9,25,5,1,220);
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `tableid` int NOT NULL,
  `orderstatusid` int NOT NULL,
  `orderdatetime` datetime NOT NULL,
  `totalamount` double NOT NULL,
  PRIMARY KEY (`orderid`),
  KEY `fk_orders_table` (`tableid`),
  KEY `fk_orders_status` (`orderstatusid`),
  CONSTRAINT `fk_orders_status` FOREIGN KEY (`orderstatusid`) REFERENCES `OrderStatus` (`orderstatusid`),
  CONSTRAINT `fk_orders_table` FOREIGN KEY (`tableid`) REFERENCES `ServingTable` (`tableid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (22,4,1,4,'2026-02-03 20:15:11',380),(23,4,1,4,'2026-02-03 20:34:28',380),(24,4,2,4,'2026-02-03 21:26:29',380),(25,4,1,4,'2026-02-03 21:29:12',680);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderstatus`
--

DROP TABLE IF EXISTS `orderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderstatus` (
  `orderstatusid` int NOT NULL AUTO_INCREMENT,
  `statusname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orderstatusid`),
  UNIQUE KEY `statusname` (`statusname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
INSERT INTO `orderstatus` VALUES (4,'DELIVERED'),(2,'IN_PREPARATION'),(1,'PENDING'),(3,'READY');
/*!40000 ALTER TABLE `orderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `questionid` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`questionid`),
  UNIQUE KEY `question` (`question`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (3,'What is your birth place?'),(2,'What is your favourite sport?'),(1,'What is your pet name?');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleid` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleid`),
  UNIQUE KEY `rolename` (`rolename`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(4,'Cook'),(2,'User'),(3,'Waiter');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servingtable`
--

DROP TABLE IF EXISTS `servingtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servingtable` (
  `tableid` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tableid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servingtable`
--

LOCK TABLES `servingtable` WRITE;
/*!40000 ALTER TABLE `servingtable` DISABLE KEYS */;
INSERT INTO `servingtable` VALUES (1,'AVAILABLE'),(2,'AVAILABLE'),(3,'AVAILABLE'),(4,'AVAILABLE'),(5,'AVAILABLE');
/*!40000 ALTER TABLE `servingtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `subcategoryid` int NOT NULL AUTO_INCREMENT,
  `subcategoryname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Starter'),(2,'Main Course'),(3,'Tandoor'),(4,'Desserts'),(5,'Beverages');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobileno` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `roleid` int DEFAULT NULL,
  `questionid` int DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `mobileno` (`mobileno`),
  KEY `roleid` (`roleid`),
  KEY `questionid` (`questionid`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleid`) REFERENCES `role` (`roleid`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`questionid`) REFERENCES `question` (`questionid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','Admin@123','7856438922','moti','pune',1,1),(2,'Cook','Cook@123','8743621398','pune','pune',4,3),(3,'Waiter','Waiter@123','8976357485','pune','pune',3,2),(4,'sujit','Sujit@123','9876534287','moti','pune',2,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-04  0:48:36
