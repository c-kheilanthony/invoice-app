import { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";
import ClientList from "./ClientList";
import { Moon, Sun } from "lucide-react";

export default function InvoicePage() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-300 dark:border-gray-600">
        <button
          onClick={() => setActiveTab("form")}
          className={`pb-2 ${
            activeTab === "form"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Create Invoice
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`pb-2 ${
            activeTab === "list"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Invoice List
        </button>
        <button
          onClick={() => setActiveTab("clients")}
          className={`pb-2 ${
            activeTab === "clients"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Clients
        </button>
      </div>

      <div>
        {activeTab === "form" && <InvoiceForm />}
        {activeTab === "list" && <InvoiceList />}
        {activeTab === "clients" && <ClientList />}
      </div>
    </div>
  );
}
