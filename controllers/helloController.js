// routes/controllers/helloController.js

exports.hello = (req, res) => {
  res.json({ message: "Hello, World!" });
};


exports.site = (req, res) => {
  res.send("Path: ");
};