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
    const { issueDate, dueDate, clientId, items, status } = req.body;

    const total = items.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    const newInvoice = new Invoice({
      invoiceNumber,
      issueDate,
      dueDate,
      client: clientId,
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
    const invoices = await Invoice.find()
      .populate("client")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PATCH /api/invoices/:id/status - Update payment status
// ✅ PATCH /api/invoices/:id/status - Update payment status
router.patch("/:id/status", async (req, res) => {
  try {
    console.log("Received PATCH request to update status");
    console.log("Invoice ID:", req.params.id);
    console.log("New Status:", req.body.status);

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      console.log("Invoice not found");
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.status = req.body.status || "Unpaid";
    await invoice.save();

    res.json(invoice);
  } catch (err) {
    console.error("❌ Error in PATCH /:id/status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🧨 DELETE /api/invoices - Delete all invoices
router.delete("/", async (req, res) => {
  try {
    await Invoice.deleteMany({});
    res.status(200).json({ message: "All invoices deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
