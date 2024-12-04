// routes/route.js
const express = require("express");
const helloController = require('../controllers/helloController');
const mainDataController = require('../controllers/mainDataController');
const historyDataController = require('../controllers/historyDataController');

const router = express.Router();

// Route: Hello World
router.get("/hello", helloController.hello);

// Route: Cek Koneksi ke JSON
router.get("/cek-koneksi", mainDataController.checkCon);

// Route: Cek Data Historis
router.get("/cek-data-histori", historyDataController.checkCon);

module.exports = router;
