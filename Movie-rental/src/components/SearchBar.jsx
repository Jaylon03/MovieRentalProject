import React from 'react';
import { Search } from 'lucide-react';
import '../styles/SearchBar.css';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search movies..."
        className="search-input"
      />
    </div>
  );
};