const express = require('express'); // Import Express
const app = express(); // Buat instance aplikasi Express

// Endpoint "/" untuk menampilkan "Hello, World!"
app.get('/', (req, res) => {
  res.json({ message: "Hello, Worldd!" });
});

// Menjalankan server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
