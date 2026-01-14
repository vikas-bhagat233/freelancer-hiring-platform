const mongoose = require("mongoose");

/**
 * Connects the application to MongoDB Atlas
 * Uses async/await for better error handling
 * This file is imported once in server.js
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected Successfully: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
