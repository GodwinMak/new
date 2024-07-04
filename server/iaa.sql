-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2024 at 10:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iaa`
--

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `hospital_id` int(11) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `hospital_district` varchar(255) NOT NULL,
  `hospital_region` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`hospital_id`, `hospital_name`, `hospital_district`, `hospital_region`, `createdAt`, `updatedAt`) VALUES
(1, 'Mkuyuni', 'Morogoro', 'Morogoro', '2024-06-14 15:16:56', '2024-06-14 15:16:56');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `village` varchar(255) NOT NULL,
  `birth_date` datetime NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `first_name`, `middle_name`, `last_name`, `ward`, `village`, `birth_date`, `gender`, `hospital_id`, `createdAt`, `updatedAt`) VALUES
(3, 'Godwin', 'Frank', 'Makyao', 'Mkuyuni', 'Kibweya', '2001-04-08 00:00:00', 'male', 1, '2024-06-15 11:08:50', '2024-06-15 11:08:50'),
(4, 'Emmanuel', 'Lassaro', 'Lassaro', 'Mkuyuni', 'Changa', '2000-03-18 00:00:00', 'male', 1, '2024-06-15 11:09:31', '2024-06-15 11:09:31'),
(5, 'Nancy', 'Godwin', 'Hizaa', 'Mkuyuni', 'Changa', '2001-06-12 00:00:00', 'female', 1, '2024-06-17 21:36:32', '2024-06-17 21:36:32');

-- --------------------------------------------------------

--
-- Table structure for table `patient_data`
--

CREATE TABLE `patient_data` (
  `patient_data_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `type_of_patient` enum('Child','Pregnant Woman','Elderly','Normal Patient') NOT NULL,
  `height` float NOT NULL,
  `weight` float NOT NULL,
  `test_made` varchar(255) DEFAULT NULL,
  `test_result` enum('Wasting','Stuning','Underweight','Inadequet Vitamins','Over weight','Obesity') DEFAULT NULL,
  `treatment` text DEFAULT NULL,
  `recommendation` enum('Referal','Admited') DEFAULT NULL,
  `payment_method` enum('Insurance','Cash','Forgiven') DEFAULT NULL,
  `status` enum('Released','Left treatment','Death') DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `patient_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_data`
--

INSERT INTO `patient_data` (`patient_data_id`, `date`, `type_of_patient`, `height`, `weight`, `test_made`, `test_result`, `treatment`, `recommendation`, `payment_method`, `status`, `comments`, `patient_id`, `createdAt`, `updatedAt`) VALUES
(8, '2024-06-16 00:00:00', 'Child', 30, 58, 'Malaria', 'Underweight', 'medication', 'Admited', 'Cash', 'Left treatment', 'No money', 3, '2024-06-16 08:09:07', '2024-06-16 09:48:59'),
(9, '2024-06-18 00:00:00', 'Normal Patient', 50, 45, 'Malaria', 'Inadequet Vitamins', 'Vitamis', 'Admited', NULL, NULL, NULL, 4, '2024-06-17 21:32:55', '2024-06-17 21:33:33'),
(10, '2024-06-18 00:00:00', 'Normal Patient', 40, 30, 'Malaria', 'Underweight', NULL, 'Admited', NULL, NULL, NULL, 5, '2024-06-17 21:37:01', '2024-06-17 21:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `report_name` varchar(255) NOT NULL,
  `report_date` datetime NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `report_name`, `report_date`, `hospital_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(12, 'Nutrition report', '2024-06-17 00:00:00', 1, 1, '2024-06-18 07:31:41', '2024-06-18 07:31:41');

-- --------------------------------------------------------

--
-- Table structure for table `report_data`
--

CREATE TABLE `report_data` (
  `report_data_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `giving_services` tinyint(1) NOT NULL,
  `giving_other_services` tinyint(1) NOT NULL,
  `rights_for_service` tinyint(1) NOT NULL,
  `home_made_food` tinyint(1) NOT NULL,
  `industrial_food` tinyint(1) NOT NULL,
  `have_food` tinyint(1) NOT NULL,
  `report_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_data`
--

INSERT INTO `report_data` (`report_data_id`, `date`, `giving_services`, `giving_other_services`, `rights_for_service`, `home_made_food`, `industrial_food`, `have_food`, `report_id`, `createdAt`, `updatedAt`) VALUES
(12, '2024-06-17 00:00:00', 1, 0, 0, 1, 0, 1, 12, '2024-06-18 07:32:02', '2024-06-18 07:32:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('admin','user') DEFAULT 'user',
  `hospital_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `user_type`, `hospital_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Godwin', 'Makyao', 'godwinnamwel@gmail.com', '$2b$10$X.2/rmJUroYNWMTO..k/0.7XTdaF8GbiWqJ/HRO/GtElgWtLH4R5i', 'admin', 1, '2024-06-14 15:17:14', '2024-06-14 15:17:14'),
(2, 'Emanuael', 'Lassaro', 'emma@gmail.com', '$2b$10$jUX/tUei7vjjfLUkb0iPGeG1HFSpOZ6DGMz/M79Ou6A/qJ9VDEsia', 'user', 1, '2024-06-18 07:52:33', '2024-06-18 07:52:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`hospital_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `hospital_id` (`hospital_id`);

--
-- Indexes for table `patient_data`
--
ALTER TABLE `patient_data`
  ADD PRIMARY KEY (`patient_data_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `report_data`
--
ALTER TABLE `report_data`
  ADD PRIMARY KEY (`report_data_id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `hospital_id` (`hospital_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `hospital_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient_data`
--
ALTER TABLE `patient_data`
  MODIFY `patient_data_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `report_data`
--
ALTER TABLE `report_data`
  MODIFY `report_data_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`hospital_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patient_data`
--
ALTER TABLE `patient_data`
  ADD CONSTRAINT `patient_data_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report_data`
--
ALTER TABLE `report_data`
  ADD CONSTRAINT `report_data_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`hospital_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
