CREATE DATABASE IF NOT EXISTS foodshare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE foodshare;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role ENUM('donor', 'ngo', 'admin') NOT NULL,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(40),
  donor_type VARCHAR(80),
  ngo_id VARCHAR(120),
  contact_person VARCHAR(160),
  address VARCHAR(255),
  location VARCHAR(160),
  verification_status VARCHAR(40),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  donor_id INT UNSIGNED NOT NULL,
  food_name VARCHAR(180) NOT NULL,
  category VARCHAR(80) NOT NULL,
  food_type VARCHAR(40) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit VARCHAR(40) NOT NULL,
  servings INT UNSIGNED NOT NULL,
  preparation_date DATE NOT NULL,
  preparation_time TIME NOT NULL,
  deadline DATETIME NOT NULL,
  storage_method VARCHAR(100),
  safety_notes TEXT,
  address VARCHAR(255) NOT NULL,
  location VARCHAR(160) NOT NULL,
  pickup_start TIME NOT NULL,
  pickup_end TIME NOT NULL,
  contact_person VARCHAR(160) NOT NULL,
  contact_phone VARCHAR(40) NOT NULL,
  description TEXT,
  status ENUM('draft', 'available', 'request_received', 'accepted', 'pickup_scheduled', 'collected', 'distributed', 'completed', 'expired', 'cancelled') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_donations_donor FOREIGN KEY (donor_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS donation_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  donation_id INT UNSIGNED NOT NULL,
  ngo_id INT UNSIGNED NOT NULL,
  people INT UNSIGNED NOT NULL,
  pickup_start TIME NOT NULL,
  pickup_end TIME NOT NULL,
  message TEXT,
  status ENUM('pending', 'accepted', 'rejected', 'cancelled', 'expired') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_donation FOREIGN KEY (donation_id) REFERENCES donations(id),
  CONSTRAINT fk_requests_ngo FOREIGN KEY (ngo_id) REFERENCES users(id)
);
