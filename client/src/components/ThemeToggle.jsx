import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`absolute text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white ${className}`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
