// routes/controllers/cekDataHistoriController.js
const fs = require("fs");

const readJsonFile = (filePath, callback) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return callback(err);
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
};

exports.checkCon = (req, res) => {
  const filePath = "./resources/database.json";

  readJsonFile(filePath, (err, jsonData) => {
    if (err) {
      console.error("Gagal membaca file JSON:", err);
      return res.status(500).send({ error: "Tidak dapat membaca file JSON" });
    }

    const historicalFilePath = `./resources/${jsonData.heartDigitalTwin.data.historicalFile}`;

    readJsonFile(historicalFilePath, (err, historicalData) => {
      if (err) {
        console.error("Gagal membaca file data historis:", err);
        return res.status(500).send({ error: "Tidak dapat membaca data historis" });
      }

      res.send({ message: "Data Historical Ditemukan", data: historicalData });
    });
  });
};
