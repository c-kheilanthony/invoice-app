import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import invoiceRoutes from "./routes/invoices.js";
import clientRoutes from "./routes/clients.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Invoice API is running 🚀");
});

app.use("/api/invoices", invoiceRoutes);
app.use("/api/clients", clientRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
