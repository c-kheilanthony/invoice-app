// seedClients.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "../models/Client.js"; // adjust path if different

dotenv.config(); // Load .env with MongoDB URI

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/invoice-app";

const clients = [
  {
    name: "Bark & Byte Solutions",
    email: "woof@bytebark.com",
    address: "404 Doggo Street, Barktown, Techsylvania",
  },
  {
    name: "The Lazy Sloth Agency",
    email: "napmaster@slothmail.com",
    address: "7th Branch, Jungle Ave, Chill City",
  },
  {
    name: "Unicorn Repairs Inc.",
    email: "sparklefix@unicornrepairs.com",
    address: "123 Rainbow Blvd, Magicville, Fantasyland",
  },
  {
    name: "Caffeinated Llamas LLC",
    email: "buzz@llamapower.com",
    address: "Espresso Fields, Bean Valley, Andes Mountains",
  },
  {
    name: "Hoverboard Chickens Co.",
    email: "cluck@hoverchicks.com",
    address: "Coop 9, Tech Barnyard, Cyberspace Farms",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await Client.deleteMany(); // Optional: Clear existing clients
    await Client.insertMany(clients);

    console.log("🌱 Funny clients inserted!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
