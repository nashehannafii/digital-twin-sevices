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

  const fDate = qDate;
  const fMonth = qMonth - 1;

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

      if (date == fDate && month == fMonth) {
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

exports.getRekapHarianPerPekan = (req, res) => {
  const { week: qWeek, month: qMonth } = req.query;

  const fWeek = qWeek;
  const fMonth = qMonth - 1;

  try {
    const historicalData = readJsonFileSync("./resources/historical_data.json");
    const groupedByDay = {};

    if (!fWeek || fWeek < 1 || fWeek > 4) {
      return res.status(400).send({ error: "Pekan harus antara 1-4" });
    }

    const weekStart = (fWeek - 1) * 7 + 1; // Tanggal mulai
    const weekEnd = fWeek * 7; // Tanggal akhir

    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    for (let i = weekStart; i <= weekEnd; i++) {
      groupedByDay[i] = {
        dayName: "", // Nama hari
        averageHeartbeatRate: 0,
      };
    }

    historicalData.historical.forEach((entry) => {
      const date = new Date(entry.timestamp).getDate();
      const month = new Date(entry.timestamp).getMonth();
      const day = new Date(entry.timestamp).getDay(); // Hari dalam pekan (0-6)

      if (date >= weekStart && date <= weekEnd && month == fMonth) {

        const currentDay = date;
        groupedByDay[currentDay].dayName = daysOfWeek[day];
        if (!groupedByDay[currentDay].heartbeatRateSum) {
          groupedByDay[currentDay].heartbeatRateSum = 0;
          groupedByDay[currentDay].count = 0;
        }
        groupedByDay[currentDay].heartbeatRateSum += parseInt(entry.heartbeatRate);
        groupedByDay[currentDay].count += 1;
      }
    });

    for (const day in groupedByDay) {
      const data = groupedByDay[day];
      if (data.heartbeatRateSum) {
        const average = data.heartbeatRateSum / data.count;
        data.averageHeartbeatRate = parseFloat(average.toFixed(2));
      }
      // Hapus properti tambahan
      delete data.heartbeatRateSum;
      delete data.count;
    }

    res.send({ message: `Rekap Harian Per Pekan ${qWeek}`, data: groupedByDay });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

