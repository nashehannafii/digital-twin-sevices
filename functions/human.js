// GENERATE HEART RATE
module.exports.generateHeartRateData = function () {
    const bpm = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const timestamp = new Date().toISOString();
    return { sensor: "Heart Rate", timestamp, heart_rate_bpm: bpm };
};

// GENERATE SPO2
module.exports.generateSpO2Data = function () {
    const spo2 = Math.floor(Math.random() * (99 - 94 + 1)) + 94;
    const pulse = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const timestamp = new Date().toISOString();
    return { sensor: "SpO2", timestamp, spo2_percentage: spo2, pulse_bpm: pulse };
}

// GENERATE ACCELEROMETER
module.exports.generateAccelerometerData = function () {
    const x = (Math.random() * (2 - -2) + -2).toFixed(2);
    const y = (Math.random() * (2 - -2) + -2).toFixed(2);
    const z = (Math.random() * (2 - -2) + -2).toFixed(2);
    const timestamp = new Date().toISOString();
    return { sensor: "Accelerometer", timestamp, x_axis: x, y_axis: y, z_axis: z };
};

// GENERATE BAROMETRIC ALTIMETER
module.exports.generateBarometricAltimeterData = function () {
    const altitude = Math.floor(Math.random() * (3000 - 0 + 1)) + 0;
    const pressure = (Math.random() * (1050 - 950) + 950).toFixed(2);
    const timestamp = new Date().toISOString();
    return { sensor: "Barometric Altimeter", timestamp, altitude_m: altitude, pressure_hpa: pressure };
};

// GENERATE THERMOMETER
module.exports.generateThermometerData = function () {
    const temperature = (Math.random() * (40 - 10) + 10).toFixed(1);
    const timestamp = new Date().toISOString();
    return { sensor: "Thermometer", timestamp, temperature_celsius: temperature };
};

// GENERATE RESPIRATION SENSOR
module.exports.generateRespirationSensorData = function () {
    const respirationRate = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    const timestamp = new Date().toISOString();
    return { sensor: "Respiration", timestamp, respiration_rate_bpm: respirationRate };
};

// GENERATE ECG (ELECTROCARDIOGRAM)
module.exports.generateECGData = function () {
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const timestamp = new Date().toISOString();
    return { sensor: "ECG", timestamp, heart_rate_bpm: heartRate, ecg_wave: "Normal" };
};
