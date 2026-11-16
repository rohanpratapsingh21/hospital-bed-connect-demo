CREATE DATABASE IF NOT EXISTS hospital_bed_connect;
USE hospital_bed_connect;

CREATE TABLE hospitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80) NOT NULL,
  ownership ENUM('Government', 'Private') NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bed_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_id INT NOT NULL,
  bed_type ENUM('general', 'icu', 'oxygen') NOT NULL,
  total INT UNSIGNED NOT NULL,
  occupied INT UNSIGNED NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_hospital_bed_type (hospital_id, bed_type),
  CONSTRAINT fk_beds_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
);

CREATE TABLE hospital_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_name VARCHAR(180) NOT NULL,
  ownership ENUM('Government', 'Private') NOT NULL,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80) NOT NULL,
  contact_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  status VARCHAR(80) NOT NULL DEFAULT 'pending demo approval',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bed_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_id INT NOT NULL,
  hospital_name VARCHAR(180) NOT NULL,
  patient_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  bed_type ENUM('general', 'icu', 'oxygen') NOT NULL,
  status VARCHAR(80) NOT NULL DEFAULT 'pending demo review',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
);