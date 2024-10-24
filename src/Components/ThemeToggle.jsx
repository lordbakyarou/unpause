import { useState, useEffect } from "react";
import { FaCloudMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/features/theme/themeSlice";

function ThemeToggle() {
  const darkMode = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    // Apply or remove dark mode class based on state
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, dispatch]);

  // console.log(darkMode);

  return (
    <button
      onClick={() =>
        darkMode == "dark"
          ? dispatch(setTheme("white"))
          : dispatch(setTheme("dark"))
      }
      className="p-2 bg-gray-200 bg-transparent text-black dark:text-white rounded"
    >
      {darkMode === "dark" ? <FaCloudMoon /> : <FaSun />}
    </button>
  );
}

export default ThemeToggle;
