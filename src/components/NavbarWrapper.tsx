"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useSearch } from "@/context/SearchContext";

export default function NavbarWrapper() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const onSearch = useSearch();

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Navbar
      onSearch={onSearch}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    />
  );
}