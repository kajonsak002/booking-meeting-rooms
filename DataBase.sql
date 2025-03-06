-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 08, 2024 at 02:23 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `booked_by` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `room_id`, `booked_by`, `date`, `start_time`, `end_time`, `status`) VALUES
(28, 5, 'Kajonsak', '2024-09-17', '00:28:00', '03:32:00', 'อณุมัติ'),
(29, 5, 'kajonsak', '2024-09-18', '20:00:00', '23:50:00', 'ยกเลิก'),
(30, 5, 'kajonsak', '2024-10-18', '15:58:00', '16:00:00', 'ยกเลิก'),
(31, 5, 'kajonsak', '2024-09-18', '16:02:00', '17:01:00', 'อณุมัติ'),
(32, 5, 'kajonsak', '2024-09-19', '00:51:00', '00:55:00', 'อณุมัติ'),
(33, 5, 'kajonsak', '2024-09-19', '14:10:00', '15:10:00', 'อณุมัติ'),
(34, 5, 'kajonsak', '2024-09-20', '15:11:00', '16:30:00', 'อณุมัติ'),
(35, 5, 'kajonsakk', '2024-09-22', '14:19:00', '15:20:00', 'ไม่อณุมัติ'),
(36, 14, 'Kanyarat Intarat', '2024-09-14', '14:00:00', '16:00:00', 'อณุมัติ'),
(37, 5, 'kajonsak', '2024-09-21', '03:40:00', '20:16:00', 'อณุมัติ'),
(38, 5, 'kajonsak', '2024-09-21', '00:40:00', '03:39:00', 'อณุมัติ'),
(39, 5, 'ขจรศักดิ์ ลี้พงษ์กุล', '2024-09-22', '16:48:00', '19:50:00', 'ยกเลิก'),
(40, 16, 'test user', '2024-09-25', '20:45:00', '23:00:00', 'ไม่อณุมัติ'),
(41, 5, 'test user', '2024-09-26', '01:30:00', '01:35:00', 'ยกเลิก'),
(42, 13, 'ขจรศักดิ์ ลี้พงษ์กุล', '2024-09-28', '20:30:00', '22:30:00', 'ยกเลิก'),
(43, 13, 'มาดี สีสวย', '2024-10-08', '07:30:00', '10:50:00', 'อณุมัติ'),
(44, 5, 'มาดี สีสวย', '2024-10-07', '10:00:00', '15:00:00', 'อณุมัติ');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `capacity` int(11) NOT NULL,
  `img` longtext NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `name`, `location`, `capacity`, `img`, `status`) VALUES
(5, 'Meeting Room1', '4934,floor 4', 100, '/images/Screenshot_2024.07.18_15.07.34.339.png', 'true'),
(13, 'Meeting Room2', '4933,floor 4', 150, '/images/1725202093.jpg', 'true'),
(14, 'Meeting Room3', '4999,floor 9', 1500, '/images/1726221945.jpg', 'true'),
(16, 'kajonsakTest', 'location', 999, '/images/1726227078.jpg', 'true'),
(17, 'asda', 'asd', 456, '/images/1726227095.jpg', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `role`) VALUES
(4, 'Kajonsak', '$2y$10$b4rMgkSL.fK.jHlJQ0HpeeV14sQb.xdq7wVXcQS/ck5FTSiSIajZi', 'admin', 'admin'),
(5, 'test', '$2y$10$rP1dCkw.WMC25QqR1n3R2OqGFts/yX1.JalS6DC5vGCZnX.Sw06aK', 'test user', 'user'),
(7, 'KajonsakV2', '$2y$10$IPM2p8yL/1g3JsOHmsFPceD2S5mYfsw.reS3tyvz7vBnv5T1mRc2K', 'ขจรศักดิ์ ลี้พงษ์กุล', 'user'),
(8, 'boonmee', '$2y$10$l19CPHGJVM6.bUopchJRuuwvQ0DiZXkRKC44kI1GHV3cNkV4t.kZS', 'บุญมี นามคำ', 'user'),
(9, 'user01', '$2y$10$6VpN/4CA9G4rRqGkzaHlJOP2cgmPDnMFLJZp1qAqU2NDtABjZhk3u', 'มาดี สีสวย', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_room_id` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `fk_room_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
