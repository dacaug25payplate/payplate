CREATE DATABASE  IF NOT EXISTS `payplatedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `payplatedb`;
-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: payplatedb
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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '228c7da4-b96f-11f0-8548-5fb159a94662:1-351';

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
  `billamount` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `discountid` int DEFAULT NULL,
  `netamount` decimal(10,2) NOT NULL,
  `paymentmode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`billid`),
  KEY `fk_bill_order` (`orderid`),
  KEY `fk_bill_discount` (`discountid`),
  CONSTRAINT `fk_bill_discount` FOREIGN KEY (`discountid`) REFERENCES `discount` (`discountid`),
  CONSTRAINT `fk_bill_order` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
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
  `categoryname` varchar(50) NOT NULL,
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
  `discount` decimal(10,2) NOT NULL,
  `startdatetime` datetime NOT NULL,
  `enddatetime` datetime NOT NULL,
  PRIMARY KEY (`discountid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish` (
  `dishid` int NOT NULL AUTO_INCREMENT,
  `dishname` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `categoryid` int NOT NULL,
  `subcategoryid` int NOT NULL,
  `images` longblob,
  PRIMARY KEY (`dishid`),
  UNIQUE KEY `dishname` (`dishname`),
  KEY `fk_dish_category` (`categoryid`),
  KEY `fk_dish_subcategory` (`subcategoryid`),
  CONSTRAINT `fk_dish_category` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`),
  CONSTRAINT `fk_dish_subcategory` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (1,'paneer tikka','chargrilled paneer with spices',180.00,1,1,NULL),(2,'veg manchurian','fried veg balls in spicy sauce',160.00,1,1,NULL),(3,'cheese corn balls','crispy cheese stuffed balls',150.00,1,1,NULL),(4,'paneer butter masala','paneer in creamy tomato gravy',240.00,1,2,NULL),(5,'veg kolhapuri','spicy mixed vegetable curry',220.00,1,2,NULL),(6,'veg biryani','aromatic basmati rice with vegetables',210.00,1,2,NULL),(7,'gulab jamun','sweet milk dumplings in sugar syrup',90.00,1,3,NULL),(8,'ice cream','vanilla ice cream scoop',70.00,1,3,NULL),(9,'brownie with ice cream','warm brownie with vanilla scoop',140.00,1,3,NULL),(10,'lemon juice','fresh lemon juice',60.00,1,4,NULL),(11,'cold coffee','chilled coffee with milk',120.00,1,4,NULL),(12,'masala chai','indian spiced tea',40.00,1,4,NULL),(13,'chicken 65','spicy deep fried chicken',220.00,2,1,NULL),(14,'chicken lollipop','crispy fried chicken wings',230.00,2,1,NULL),(15,'fish fingers','crumb fried fish strips',250.00,2,1,NULL),(16,'butter chicken','chicken in rich creamy gravy',280.00,2,2,NULL),(17,'chicken biryani','aromatic rice cooked with chicken',260.00,2,2,NULL),(18,'mutton curry','slow cooked spicy mutton curry',320.00,2,2,NULL),(19,'chocolate mousse','soft creamy chocolate dessert',160.00,2,3,NULL),(20,'buttermilk','chilled spiced curd drink',50.00,2,4,NULL),(21,'soft drink','coke, pepsi, sprite',60.00,2,4,NULL);
/*!40000 ALTER TABLE `dish` ENABLE KEYS */;
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
  `rating` int NOT NULL,
  `comments` text,
  `feedbackdate` datetime NOT NULL,
  PRIMARY KEY (`feedbackid`),
  KEY `fk_feedback_user` (`userid`),
  KEY `fk_feedback_order` (`orderid`),
  CONSTRAINT `fk_feedback_order` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`),
  CONSTRAINT `fk_feedback_user` FOREIGN KEY (`userid`) REFERENCES `user` (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `orderitemid` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `dishid` int NOT NULL,
  `orderid` int NOT NULL,
  `totaldishprice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderitemid`),
  KEY `fk_orderitem_dish` (`dishid`),
  KEY `fk_orderitem_order` (`orderid`),
  CONSTRAINT `fk_orderitem_dish` FOREIGN KEY (`dishid`) REFERENCES `dish` (`dishid`),
  CONSTRAINT `fk_orderitem_order` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
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
  `dateandtime` datetime NOT NULL,
  `totalamount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderid`),
  KEY `fk_orders_user` (`userid`),
  KEY `fk_orders_table` (`tableid`),
  KEY `fk_orders_status` (`orderstatusid`),
  CONSTRAINT `fk_orders_status` FOREIGN KEY (`orderstatusid`) REFERENCES `orderstatus` (`orderstatusid`),
  CONSTRAINT `fk_orders_table` FOREIGN KEY (`tableid`) REFERENCES `servingtable` (`tableid`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`userid`) REFERENCES `user` (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
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
  `statusname` varchar(50) NOT NULL,
  PRIMARY KEY (`orderstatusid`),
  UNIQUE KEY `statusname` (`statusname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
INSERT INTO `orderstatus` VALUES (1,'ordered'),(2,'preparing'),(3,'ready'),(4,'served');
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
  `question` varchar(100) NOT NULL,
  PRIMARY KEY (`questionid`),
  UNIQUE KEY `question` (`question`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (3,'What is your birth place?'),(4,'What is your favourite car?'),(5,'What is your favourite food?'),(2,'What is your favourite sport?'),(1,'What is your pet name?');
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
  `rolename` varchar(50) NOT NULL,
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
  `tablecapacity` int NOT NULL,
  PRIMARY KEY (`tableid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servingtable`
--

LOCK TABLES `servingtable` WRITE;
/*!40000 ALTER TABLE `servingtable` DISABLE KEYS */;
INSERT INTO `servingtable` VALUES (1,2),(2,2),(3,2),(4,4),(5,4),(6,4),(7,4),(8,6),(9,6),(10,8);
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
  `subcategoryname` varchar(100) NOT NULL,
  PRIMARY KEY (`subcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'starters'),(2,'main course'),(3,'desserts'),(4,'beverages');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `USERID` int NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `MOBILENO` varchar(50) NOT NULL,
  `ANSWER` varchar(255) NOT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `ROLEID` int NOT NULL,
  `QUESTIONID` int NOT NULL,
  PRIMARY KEY (`USERID`),
  UNIQUE KEY `USERNAME` (`USERNAME`),
  UNIQUE KEY `MOBILENO` (`MOBILENO`),
  KEY `FK_USER_ROLEID` (`ROLEID`),
  KEY `FK_USER_QUESTIONID` (`QUESTIONID`),
  CONSTRAINT `FK_USER_QUESTIONID` FOREIGN KEY (`QUESTIONID`) REFERENCES `QUESTION` (`questionid`),
  CONSTRAINT `FK_USER_ROLEID` FOREIGN KEY (`ROLEID`) REFERENCES `ROLE` (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'parth','parth123','9000001001','Sheru','Mumbai',1,1),(2,'rahul','rahul123','9000001002','Cricket','Pune',2,2),(3,'pooja','pooja123','9000001003','Misal Pav','Nashik',2,5),(4,'amit','amit123','9000001004','Nagpur','Nagpur',2,3),(5,'neha','neha123','9000001005','Swift','Kolhapur',2,4),(6,'sachin','sachin123','9000001006','Moti','Mumbai',3,1),(7,'akash','akash123','9000001007','Kabaddi','Maharashtra',3,2),(8,'vijay','vijay123','9000001008','PuranPoli','Mumbai',4,5),(9,'sunita','sunita123','9000001009','Solapur','Maharashtra',4,3);
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

-- Dump completed on 2026-01-21 16:37:02
