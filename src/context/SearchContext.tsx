"use client";
import { createContext, useContext } from "react";

export const SearchContext = createContext<(searchTerm: string) => void>(() => {});

export const useSearch = () => useContext(SearchContext);