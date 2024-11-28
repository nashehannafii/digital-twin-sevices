const express = require("express");
const appConfig = require("./config/config");
const setupWebSocketServer = require("./routes/route");

const app = express();
const { PORT, WS_PORT } = appConfig;

// Endpoint HTTP biasa (opsional untuk debugging)
app.get("/", (req, res) => {
  res.send("WebSocket and HTTP server running!");
});

// Jalankan WebSocket Server
setupWebSocketServer(WS_PORT);

// Jalankan server HTTP
app.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
