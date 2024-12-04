// routes/controllers/cekKoneksiController.js
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

    res.send({ message: "Koneksi berhasil", data: jsonData });
  });
};
