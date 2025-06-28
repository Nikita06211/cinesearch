"use client";

import { useState, useEffect } from "react";
import SearchResults from "@/components/SearchResults";
import NavbarWrapper from "@/components/NavbarWrapper";
import { debounce } from "lodash";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced fetch for autocomplete
  const fetchSuggestions = debounce(async (query: string) => {
    if (!query) return setSuggestions([]);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    setSuggestions(data.results || []);
  }, 400);

  useEffect(() => {
    fetchSuggestions(searchTerm);
    return () => fetchSuggestions.cancel();
  }, [searchTerm]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchTerm(query);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div>
      <NavbarWrapper />
      <div className="max-w-xl mx-auto mt-8">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch(searchTerm);
          }}
        >
          <input
            className="w-full px-4 py-2 rounded border"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
        </form>
        {/* Autocomplete dropdown */}
        {suggestions.length > 0 && (
          <ul className="bg-white border rounded shadow mt-1 absolute w-full z-10">
            {suggestions.slice(0, 5).map(movie => (
              <li
                key={movie.id}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(movie.title);
                  handleSearch(movie.title);
                  setSuggestions([]);
                }}
              >
                {movie.title} ({movie.release_date?.slice(0, 4)})
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}