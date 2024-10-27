// lib/mongodb.js
import mongoose from "mongoose";

// Declare a global variable for the connection, to reuse it
let isConnected;

export async function dbConnect() {
  // Check if we are already connected to avoid reconnecting
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1; // Set connection state
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
