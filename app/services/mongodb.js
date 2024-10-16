import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    isConnected = connection.connections[0].readyState;
    return connection;
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
