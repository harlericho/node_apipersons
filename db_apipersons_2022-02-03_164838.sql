--
-- Table structure for table `person`
--
CREATE DATABASE  IF NOT EXISTS `db_apipersons` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_apipersons`;
DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Status',
  `dni` varchar(10) NOT NULL COMMENT 'Dni',
  `names` varchar(100) NOT NULL COMMENT 'Names',
  `email` varchar(150) NOT NULL COMMENT 'Email',
  `phone` varchar(10) NOT NULL COMMENT 'Phone',
  `photo` varchar(150) DEFAULT NULL COMMENT 'Photo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Person';
