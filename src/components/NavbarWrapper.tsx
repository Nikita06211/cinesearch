"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState("");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Navbar
      onSearch={setSubmittedSearch}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    />
  );
}