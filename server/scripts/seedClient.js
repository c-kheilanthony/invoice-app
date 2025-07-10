import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "../models/Client.js";

dotenv.config(); // loads .env

await mongoose.connect(process.env.MONGODB_URI);

const testClient = new Client({
  name: "Volodymyr Zelenskyy",
  email: "zelenskyy@ukraine.gov",
  address: "Bankova Street, Kyiv, Ukraine",
});

try {
  await testClient.save();
  console.log("✅ Client seeded:", testClient);
} catch (err) {
  console.error("❌ Failed to seed client:", err);
}

await mongoose.disconnect();
