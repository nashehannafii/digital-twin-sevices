const express = require("express");
const appConfig = require("./config/config");
const setupWebSocketServer = require("./routes/webSocket");
const routes = require("./routes/route");

const app = express();
const { PORT, WS_PORT } = appConfig;

// Gunakan routes yang sudah dipindahkan ke file terpisah
app.use(routes);

// Jalankan WebSocket Server
setupWebSocketServer(WS_PORT);

// Jalankan server HTTP
app.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
