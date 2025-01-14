import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  domain: string;
  setDomain: (domain: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ domain, setDomain, onSearch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain name (e.g., example.com)"
          className="w-full px-6 py-4 bg-gray-900 border border-green-500 rounded-lg text-green-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 text-green-500 hover:text-green-400"
          type="submit"
        >
          <Search size={24} />
        </motion.button>
      </div>
    </form>
  );
}