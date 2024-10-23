import { useState, useEffect } from "react";
import { FaCloudMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Apply or remove dark mode class based on state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-200 dark:bg-black/30 text-black dark:text-white rounded"
    >
      {darkMode ? <FaCloudMoon /> : <FaSun />}
    </button>
  );
}

export default ThemeToggle;
