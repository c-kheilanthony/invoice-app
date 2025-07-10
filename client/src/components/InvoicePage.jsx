import { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";
import ClientList from "./ClientList";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function InvoicePage() {
  const [activeTab, setActiveTab] = useState("form");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <ThemeToggle className="absolute top-4 right-24" />
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
      >
        Logout
      </button>

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
