const { WebSocketServer } = require("ws");
const Human = require("../functions/human");

function setupWebSocketServer(wsPort) {
  const wss = new WebSocketServer({ port: wsPort });

  wss.on("connection", (ws) => {
    console.log("Client connected!");

    // Kirim data secara real-time setiap 1 detik
    const interval = setInterval(() => {
      const heartRateData = Human.generateHeartRateData();
      const spo2Data = Human.generateSpO2Data();
      const accelerometerData = Human.generateAccelerometerData();
      const barometricAltimerData = Human.generateBarometricAltimeterData();
      const ECGData = Human.generateECGData();
      const respirationSensorData = Human.generateRespirationSensorData();
      const thermometerData = Human.generateThermometerData();

      ws.send(JSON.stringify(heartRateData));
      ws.send(JSON.stringify(spo2Data));
      ws.send(JSON.stringify(accelerometerData));
      ws.send(JSON.stringify(barometricAltimerData));
      ws.send(JSON.stringify(ECGData));
      ws.send(JSON.stringify(respirationSensorData));
      ws.send(JSON.stringify(thermometerData));
    }, 1000);

    // Bersihkan interval ketika koneksi ditutup
    ws.on("close", () => {
      console.log("Client disconnected!");
      clearInterval(interval);
    });
  });

  console.log(`WebSocket server running on ws://localhost:${wsPort}`);
}

module.exports = setupWebSocketServer;
