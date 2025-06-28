import React, { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, isDarkMode, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <nav className="w-full bg-base-100 shadow-md">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            cinesearch
          </span>
        </div>
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`rounded-full p-2 border transition-all duration-300 ${
            isDarkMode
              ? "border-purple-400 hover:bg-purple-900/20 text-purple-300"
              : "border-purple-300 hover:bg-purple-50 text-purple-600"
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="px-4 pb-3 flex gap-4">
        <div className="flex-1 relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 h-12 w-full text-lg border-0 rounded-lg outline-none transition-colors duration-200 ${
              isDarkMode
                ? "bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
                : "bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
            }`}
          />
        </div>
        <button
          type="submit"
          className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          disabled={!searchTerm.trim()}
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;