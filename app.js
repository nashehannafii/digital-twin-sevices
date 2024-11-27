require("dotenv").config(); // Load konfigurasi dari .env

const express = require("express");
const mysql = require("mysql2");

const app = express();

// Mengambil konfigurasi dari .env
const PORT = process.env.PORT || 3000;
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Endpoint 1: Cek koneksi ke database
app.get("/check-db", (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Database connection failed",
        error: err.message,
      });
    } else {
      res.json({ status: "success", message: "Database connection successful" });
    }
    connection.end();
  });
});

// Endpoint 2: Hello World
app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
