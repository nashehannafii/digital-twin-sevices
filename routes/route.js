// routes/route.js
const express = require("express");
const helloController = require('../controllers/helloController');
const mainDataController = require('../controllers/mainDataController');
const historyDataController = require('../controllers/historyDataController');

const router = express.Router();

// Route: Hello World
router.get("/", helloController.site);
router.get("/hello", helloController.hello);

// Route: Cek Koneksi ke JSON
router.get("/cek-koneksi", mainDataController.checkCon);

// Route: Cek Data Historis
router.get("/cek-data-histori", historyDataController.checkCon);

router.get("/hdt-ikhtisar", mainDataController.getHdtIkhtisar);
router.get("/rekap-harian-perjam", mainDataController.getRekapHarianPerJam);
// router.get("/rekap-bulanan-perhari", mainDataController.getRekapBulananPerHari);
// router.get("/rekap-tahunan-perbulan", mainDataController.getRekapTahunanPerBulan);

module.exports = router;
