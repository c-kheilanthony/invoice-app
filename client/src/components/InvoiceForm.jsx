import { useState } from "react";
import axios from "axios";

export default function InvoiceForm() {
  const [form, setForm] = useState({
    issueDate: "",
    dueDate: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [{ name: "", quantity: 1, unitPrice: 0 }],
  });

  const handleItemChange = (index, key, value) => {
    const newItems = [...form.items];
    newItems[index][key] = value;
    setForm({ ...form, items: newItems });
  };

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      issueDate: form.issueDate,
      dueDate: form.dueDate,
      client: {
        name: form.clientName,
        email: form.clientEmail,
        address: form.clientAddress,
      },
      items: form.items,
    };

    try {
      await axios.post("http://localhost:5000/api/invoices", payload);
      alert("Invoice created!");
    } catch (err) {
      console.error(err);
      alert("Error creating invoice");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 transition-colors duration-300 shadow-md space-y-6 text-gray-900 dark:text-gray-100"
    >
      <h2 className="text-xl font-bold">Create Invoice</h2>

      <div className="flex gap-x-4">
        <div className="w-1/2 space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Issue Date
          </label>
          <input
            type="date"
            value={form.issueDate}
            onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
            className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        <div className="w-1/2 space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            Due Date
          </label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Client Name"
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Client Email"
          value={form.clientEmail}
          onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <input
          type="text"
          placeholder="Client Address"
          value={form.clientAddress}
          onChange={(e) => setForm({ ...form, clientAddress: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-left">Items</p>
        {form.items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(i, "name", e.target.value)}
              className="flex-1 border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
            <input
              type="number"
              min={1}
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(i, "quantity", +e.target.value)}
              className="w-20 border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
            <input
              type="number"
              min={0}
              placeholder="Price"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(i, "unitPrice", +e.target.value)
              }
              className="w-28 border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
            {form.items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(i)}
                className="text-red-500 dark:text-red-300"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="text-blue-600 dark:text-blue-400 text-sm"
        >
          + Add Item
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 dark:bg-blue-500 text-white dark:text-black py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-400"
      >
        Submit
      </button>
    </form>
  );
}
