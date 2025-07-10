import InvoicePage from "./components/InvoicePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors text-gray-900 dark:text-gray-100">
      <InvoicePage />
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-600 shadow",
          duration: 4000,
        }}
      />
    </div>
  );
}

export default App;
