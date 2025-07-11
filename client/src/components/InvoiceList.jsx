import { useEffect, useState } from "react";
import { generateInvoicePDF } from "../services/pdfGenerator";
import axios from "axios";

export default function InvoiceList() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [invoices, setInvoices] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "invoiceNumber") {
      aValue = a.invoiceNumber || "";
      bValue = b.invoiceNumber || "";
    }

    // Special cases
    if (sortConfig.key === "client") {
      aValue = (a.client?.name || "").toLowerCase();
      bValue = (b.client?.name || "").toLowerCase();
    }

    if (sortConfig.key === "amount") {
      aValue = a.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      bValue = b.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = sortedInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const totalPages = Math.ceil(sortedInvoices.length / invoicesPerPage);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/invoices");
        setInvoices(res.data);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      }
    };

    fetchInvoices();
  }, []);

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Invoice List
        </h2>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200 text-sm uppercase">
              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("invoiceNumber")}
              >
                Invoice #{" "}
                {sortConfig.key === "invoiceNumber" &&
                  (sortConfig.direction === "asc" ? "▴" : "▾")}
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("client")}
              >
                Client{" "}
                {sortConfig.key === "client" &&
                  (sortConfig.direction === "asc" ? "▴" : "▾")}
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("dueDate")}
              >
                Due Date{" "}
                {sortConfig.key === "dueDate" &&
                  (sortConfig.direction === "asc" ? "▴" : "▾")}
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("amount")}
              >
                Amount{" "}
                {sortConfig.key === "amount" &&
                  (sortConfig.direction === "asc" ? "▴" : "▾")}
              </th>

              <th
                className="p-3 cursor-pointer"
                onClick={() => toggleSort("status")}
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? "▴" : "▾")}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice, idx) => {
              const total = invoice.items.reduce(
                (sum, item) => sum + item.quantity * item.unitPrice,
                0
              );
              const isOverdue =
                invoice.status !== "Paid" &&
                new Date(invoice.dueDate) < new Date();
              return (
                <tr
                  key={invoice._id}
                  className={`border-t dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 ${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <td className="p-3">{invoice.invoiceNumber}</td>

                  <td className="p-3">{invoice.client?.name || "N/A"}</td>
                  <td className="p-3">
                    <span>{invoice.dueDate?.slice(0, 10)}</span>
                    {isOverdue && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100">
                        Overdue
                      </span>
                    )}
                  </td>

                  <td className="p-3">₱ {total.toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={async () => {
                        const newStatus =
                          invoice.status === "Paid" ? "Unpaid" : "Paid";
                        console.log("Toggling status for invoice:", {
                          id: invoice._id,
                          newStatus,
                        });
                        try {
                          await axios.patch(
                            `http://localhost:5000/api/invoices/${invoice._id}/status`,
                            { status: newStatus }
                          );
                          setInvoices((prev) =>
                            prev.map((inv) =>
                              inv._id === invoice._id
                                ? { ...inv, status: newStatus }
                                : inv
                            )
                          );
                        } catch (err) {
                          console.error("Failed to update status", err);
                        }
                      }}
                      className={`cursor-pointer px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                        invoice.status === "Paid"
                          ? "bg-green-200 text-green-800 hover:bg-green-300 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
                          : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300 dark:bg-yellow-700 dark:text-yellow-100 dark:hover:bg-yellow-600"
                      }`}
                      title={`Click to mark as ${
                        invoice.status === "Paid" ? "Unpaid" : "Paid"
                      }`}
                    >
                      {invoice.status}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => generateInvoicePDF(invoice)}
                      className="text-sm px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              );
            })}
            {invoices.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm">
              <p className="text-gray-900 dark:text-white text-sm mb-4">
                Are you sure you want to delete all invoices? This cannot be
                undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-3 py-1 text-sm rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      await axios.delete("http://localhost:5000/api/invoices");
                      setInvoices([]);
                      setShowConfirmModal(false);
                    } catch (err) {
                      console.error("Failed to delete invoices", err);
                    }
                  }}
                  className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
