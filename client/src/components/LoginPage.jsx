import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials for mock login
    if (email === "admin@example.com" && password === "password") {
      login({ name: "Admin", email });
      toast.success("Welcome back!");
      navigate("/invoices");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-md mx-4 p-8 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login to Invoice App
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <p className="text-xs mt-4 text-center text-gray-500 dark:text-gray-400">
          Use <code className="select-all">admin@example.com</code> /{" "}
          <code className="select-all">password</code>
        </p>
      </div>
    </div>
  );
}
