'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border rounded-md overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-grow px-4 py-2 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
        <span className="material-icons-outlined">search</span>
      </button>
    </form>
  );
}
