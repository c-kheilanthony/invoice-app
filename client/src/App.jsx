import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div
      className={
        isDark
          ? "dark min-h-screen bg-gray-900 transition-colors duration-300"
          : "min-h-screen bg-gray-100 transition-colors duration-300"
      }
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          Toggle {isDark ? "Light" : "Dark"} Mode
        </button>
      </div>
      <InvoiceForm />
    </div>
  );
}

export default App;
