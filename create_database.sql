CREATE DATABASE `server_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

use server_management;

CREATE TABLE `history` (
  `id` int NOT NULL,
  `time` datetime NOT NULL,
  `cpu_usage` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `user_num` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`,`time`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


