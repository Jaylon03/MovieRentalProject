import React from 'react';
import '../styles/FilterBar.css';

const genres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Crime', 'Comedy'];

export const FilterBar = ({ selectedGenre, onGenreChange }) => {
  return (
    <div className="filter-bar">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={`filter-button ${selectedGenre === genre ? 'active' : ''}`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};