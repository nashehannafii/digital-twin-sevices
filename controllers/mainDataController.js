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

const readJsonFileSync = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Gagal membaca file JSON:", error);
    throw new Error("File JSON tidak dapat diakses.");
  }
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

exports.getHdtIkhtisar = (req, res) => {
  try {
    const data = readJsonFileSync("./resources/database.json");
    res.send({ message: "Ikhtisar HDT", data: data.heartDigitalTwin });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getRekapHarianPerJam = (req, res) => {
  const { date: qDate, month: qMonth } = req.query;

  console.error(req.query);

  try {
    const historicalData = readJsonFileSync("./resources/historical_data.json");
    const groupedByHour = {};

    for (let i = 0; i < 24; i++) {
      groupedByHour[i] = {
        heartbeatRateSum: 0,
        count: 0,
      };
    }

    historicalData.historical.forEach((entry) => {
      const hour = new Date(entry.timestamp).getHours();
      const date = new Date(entry.timestamp).getDate();
      const month = new Date(entry.timestamp).getMonth();

      if (date == qDate && month == qMonth) {
        groupedByHour[hour].heartbeatRateSum += parseInt(entry.heartbeatRate);
        groupedByHour[hour].count += 1;
      }
    });


    for (const hour in groupedByHour) {

      if (groupedByHour[hour].heartbeatRateSum != 0) {
        const average =
          groupedByHour[hour].heartbeatRateSum / groupedByHour[hour].count;

        groupedByHour[hour].averageHeartbeatRate = parseFloat(
          average.toFixed(2)
        );
      } else {
        groupedByHour[hour].averageHeartbeatRate = 0
      }

      // Hapus properti yang tidak diperlukan
      delete groupedByHour[hour].heartbeatRateSum;
      delete groupedByHour[hour].count;
    }

    res.send({ message: "Rekap Harian Per Jam", data: groupedByHour });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
