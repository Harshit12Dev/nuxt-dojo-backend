const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://harshitsampat:zYuDU6kYTFIvcLvX@cluster0.fezzfq5.mongodb.net/shecom"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;
