const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGO_URI, options)
  .then(() => {
    // console.log("Connected to the database.");
  })
  .catch((err) => {
    // console.log("Error connecting to the database", err);
  });

const db = mongoose.connection;

module.exports = db;
