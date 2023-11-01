require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_DB_CERT;

async function connect() {
  try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB through Mongoose");
  } catch (err) {
      console.error("Could not connect to MongoDB through Mongoose", err);
  }
}


module.exports = { connect };
