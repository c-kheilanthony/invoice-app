import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// Helper to generate invoice numbers like INV-0001, INV-0002
const generateInvoiceNumber = async () => {
  const count = await Invoice.countDocuments();
  const padded = String(count + 1).padStart(4, "0");
  return `INV-${padded}`;
};

// 📥 POST /api/invoices - Create new invoice
router.post("/", async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    const { issueDate, dueDate, client, items, status } = req.body;

    const total = items.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    const newInvoice = new Invoice({
      invoiceNumber,
      issueDate,
      dueDate,
      client,
      items,
      total,
      status: status || "Unpaid",
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    console.error("Error creating invoice:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📄 GET /api/invoices - List all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PATCH /api/invoices/:id/status - Update payment status
router.patch("/:id/status", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.status = req.body.status || "Unpaid";
    await invoice.save();

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
