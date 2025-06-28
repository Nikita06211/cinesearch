"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SearchResults from "@/components/SearchResults";
import { SearchContext } from "@/context/SearchContext";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
          searchTerm
        )}`
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
      {searchResults ? (
        loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <div className="text-center py-20 text-lg text-gray-500 dark:text-gray-200">
            No movies present.
          </div>
        )
      ) : (
        <Hero />
      )}
    </SearchContext.Provider>
  );
}
