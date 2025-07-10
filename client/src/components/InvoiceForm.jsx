import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      toast.success("Invoice successfully created!");
    } catch (err) {
      console.error(err);
      toast.error("Error creating invoice");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 transition-colors duration-300 shadow-md space-y-6 text-gray-900 dark:text-gray-100"
    >
      <h2 className="text-xl font-bold">Create Invoice</h2>

      <div className="space-y-2">
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

      <div className="space-y-2">
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
          Client Name
        </label>
        <input
          type="text"
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
          Client Email
        </label>
        <input
          type="email"
          value={form.clientEmail}
          onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
          Client Address
        </label>
        <input
          type="text"
          value={form.clientAddress}
          onChange={(e) => setForm({ ...form, clientAddress: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-left">Items</p>
        {form.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-end gap-2 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            {/* Line 1: Item name + Remove button (flex row on small screens too) */}
            <div className="flex justify-between gap-2 w-full">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1 text-left">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(i, "name", e.target.value)}
                  className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              {form.items.length > 1 && (
                <div className="w-8 self-center mt-6 md:mt-5">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(i)}
                    className="text-red-500 dark:text-red-300 text-xl"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Line 2: Qty and Price stacked under */}
            <div className="flex gap-2 w-full">
              <div className="w-20">
                <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1 text-left">
                  Qty
                </label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(i, "quantity", +e.target.value)
                  }
                  className="w-full border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>

              <div className="flex-1 md:w-28">
                <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1 text-left">
                  Unit Price
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                    ₱
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(i, "unitPrice", +e.target.value)
                    }
                    className="w-full pl-6 border p-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
              </div>
            </div>
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
