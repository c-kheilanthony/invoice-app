// seedInvoices.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Invoice from "../models/Invoice.js"; // Adjust if needed

dotenv.config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/invoice-app";

// Use the client IDs you gave
const clientIds = [
  "686f4f14cd959e8491266a7f",
  "686f4f14cd959e8491266a82",
  "686f4f14cd959e8491266a83",
  "686f4f14cd959e8491266a80",
  "686f4f14cd959e8491266a81",
];

const itemCatalog = [
  "Tech Bone",
  "Quantum Furball",
  "Hover Feather",
  "Rainbow Duct Tape",
  "Nap Cushion XL",
  "Sloth Speed Enhancer",
  "Unicorn Glue",
  "Llama Espresso Shot",
  "Feather Stabilizer",
  "Rainbow Blaster",
  "Hover Chick Saddle",
  "Byte Collar",
  "Jungle VPN Service",
  "Sparkle Helmet",
  "Cluck Translator",
];

let invoiceCounter = 1001; // start from 1001

const generateRandomInvoice = (clientId) => {
  const itemCount = Math.floor(Math.random() * 3) + 1;

  const items = Array.from({ length: itemCount }, () => {
    const name = itemCatalog[Math.floor(Math.random() * itemCatalog.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const unitPrice = Math.floor(Math.random() * 900) + 100;
    return { name, quantity, unitPrice };
  });

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const today = new Date();
  const issueDate = new Date(today);
  issueDate.setDate(today.getDate() - Math.floor(Math.random() * 10));

  const dueDate = new Date(issueDate);
  dueDate.setDate(issueDate.getDate() + Math.floor(Math.random() * 10) + 5);

  return {
    invoiceNumber: `INV-${invoiceCounter++}`,
    issueDate,
    dueDate,
    client: clientId,
    items,
    total,
    status: Math.random() < 0.5 ? "Paid" : "Unpaid",
  };
};

const seedInvoices = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Invoice.deleteMany(); // Optional: clean slate

    const invoices = [];

    for (let i = 0; i < 15; i++) {
      const randomClientId =
        clientIds[Math.floor(Math.random() * clientIds.length)];
      invoices.push(generateRandomInvoice(randomClientId));
    }

    await Invoice.insertMany(invoices);
    console.log("✅ 15 funny invoices inserted!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedInvoices();
