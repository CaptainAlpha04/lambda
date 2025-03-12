"use client";
import { useState } from 'react';
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="bg-white shadow-sm p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or type a command"
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-50"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}