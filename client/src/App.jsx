import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InvoicePage from "./components/InvoicePage";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors text-gray-900 dark:text-gray-100">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/invoices"
              element={
                <PrivateRoute>
                  <InvoicePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/invoices" />} />
          </Routes>
        </Router>

        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-600 shadow",
            duration: 4000,
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
