const fs = require('fs');

// Fungsi untuk menghasilkan data acak dalam rentang tertentu
function getRandomValue(min, max, decimals = 0) {
    const factor = Math.pow(10, decimals);
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

// Fungsi untuk menghasilkan data historis
function generateHistoricalData(startTime, hours, intervalMinutes) {
    const data = [];
    const startTimestamp = new Date(startTime).getTime();
    const intervalMillis = intervalMinutes * 60 * 1000;
    const totalEntries = (hours * 60) / intervalMinutes;

    for (let i = 0; i < totalEntries; i++) {
        const timestamp = new Date(startTimestamp + i * intervalMillis).toISOString();
        data.push({
            timestamp,
            heartbeatRate: parseInt(getRandomValue(65, 135)),
            bloodPressure: `${parseInt(getRandomValue(110, 130))}/${parseInt(getRandomValue(70, 90))} mmHg`,
            oxygenSaturation: `${getRandomValue(95, 100)}%`,
            bodyTemperature: `${getRandomValue(36.5, 37.5, 1)}°C`
        });
    }

    return data;
}

const startTime = '2024-12-01T00:00:00Z';
const hours = 24 * 30;
const intervalMinutes = 5;

const historicalData = {
    historical: generateHistoricalData(startTime, hours, intervalMinutes)
};

fs.writeFile('../outputs/historical_data.json', JSON.stringify(historicalData, null, 4), (err) => {
    if (err) {
        console.error('Gagal menulis file:', err);
    } else {
        console.log('Data historis berhasil dibuat di file historical_data.json');
    }
});
