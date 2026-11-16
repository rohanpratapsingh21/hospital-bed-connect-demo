import mysql from "mysql2/promise";
import { hospitals as seedHospitals } from "./data/hospitals.js";

let pool;

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "hospital_bed_connect",
      waitForConnections: true,
      connectionLimit: 10
    });
  }
  return pool;
}

export async function initializeDatabase() {
  const db = getDb();
  await db.query(`CREATE TABLE IF NOT EXISTS hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    ownership ENUM("Government", "Private") NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS bed_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,
    bed_type ENUM("general", "icu", "oxygen") NOT NULL,
    total INT UNSIGNED NOT NULL,
    occupied INT UNSIGNED NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_hospital_bed_type (hospital_id, bed_type),
    CONSTRAINT fk_beds_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS hospital_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_name VARCHAR(180) NOT NULL,
    ownership ENUM("Government", "Private") NOT NULL,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    contact_name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    status VARCHAR(80) NOT NULL DEFAULT "pending demo approval",
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS bed_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,
    hospital_name VARCHAR(180) NOT NULL,
    patient_name VARCHAR(120) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    bed_type ENUM("general", "icu", "oxygen") NOT NULL,
    status VARCHAR(80) NOT NULL DEFAULT "pending demo review",
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_requests_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
  )`);

  const [[{ count }]] = await db.query("SELECT COUNT(*) AS count FROM hospitals");
  if (count) return;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    for (const hospital of seedHospitals) {
      const [result] = await connection.execute(
        "INSERT INTO hospitals (id, name, city, state, ownership, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [hospital.id, hospital.name, hospital.city, hospital.state, hospital.ownership, hospital.address, hospital.phone]
      );
      for (const [bedType, beds] of Object.entries(hospital.beds)) {
        await connection.execute(
          "INSERT INTO bed_inventory (hospital_id, bed_type, total, occupied) VALUES (?, ?, ?, ?)",
          [result.insertId, bedType, beds.total, beds.occupied]
        );
      }
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}