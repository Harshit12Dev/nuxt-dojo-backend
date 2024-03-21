const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://harshitsampat:fCS34s4IdGEXb7MU@cluster0.dcenmeg.mongodb.net/shecom"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;
