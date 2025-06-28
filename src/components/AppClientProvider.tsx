"use client";

import { useState } from "react";
import { SearchContext } from "@/context/SearchContext";
import NavbarWrapper from "@/components/NavbarWrapper";
import SearchResults from "@/components/SearchResults"; // <-- import this

export default function AppClientProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider value={handleSearch}>
      <NavbarWrapper />
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      )}
      {searchResults && !loading && <SearchResults results={searchResults} />}
      {children}
    </SearchContext.Provider>
  );
}