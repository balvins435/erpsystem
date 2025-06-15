// src/components/Header.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaBox,
  FaMoneyBill,
  FaClipboardList,
  FaChartLine,
  FaUsers,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleThemeToggle = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/login", label: "Login", icon: <FaUser /> },
    { to: "/inventory", label: "Inventory", icon: <FaBox /> },
    { to: "/finance", label: "Finance", icon: <FaMoneyBill /> },
    { to: "/procurement", label: "Procurement", icon: <FaClipboardList /> },
    { to: "/procurement-records", label: "Procurement Records", icon: <FaChartLine /> },
    { to: "/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">MyApp</div>

      {/* Theme Toggle */}
      <button onClick={handleThemeToggle} className="mr-4 text-xl lg:hidden">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Hamburger Icon */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Navigation Links */}
      <ul
        className={`lg:flex lg:gap-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-blue-600 dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        {navLinks.map((link) => (
          <li key={link.to} className="border-t lg:border-none">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 lg:py-0 hover:bg-blue-700 dark:hover:bg-gray-800 lg:hover:bg-transparent ${
                  isActive ? "bg-blue-700 dark:bg-gray-800 lg:underline font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.icon} {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop Theme Toggle */}
      <button
        onClick={handleThemeToggle}
        className="hidden lg:block ml-4 text-xl"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Header;
