require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  WS_PORT: process.env.WS_PORT || 4000,
};
