"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <button
      className="relative w-16 h-8 flex items-center bg-neutral-300 dark:bg-green-600 cursor-pointer rounded-full p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
      {!darkMode && (
        <FaSun className="z-10 text-yellow-300 absolute right-[8px]" />
      )}
      <motion.div
        animate={darkMode ? { left: 35, scale: 1 } : { left: 5, scale: 1 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 600,
          damping: 28,
        }}
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300`}
      ></motion.div>
      {darkMode && (
        <FaMoon className="z-10 text-yellow-300 absolute left-[8px]" />
      )}
    </button>
  );
}
