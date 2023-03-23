const mongoose = require("mongoose");
const { config } = require("../config/config");

if (!config.db_uri) return console.log("DB URI not found!");

mongoose
  .connect(config.db_uri)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => console.log("DB not connected!"));

module.exports = mongoose;
