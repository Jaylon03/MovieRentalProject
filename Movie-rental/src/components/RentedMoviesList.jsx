import React from 'react';
import { Clock } from 'lucide-react';
import '../styles/RentedMoviesList.css';

export const RentedMoviesList = ({ rentedMovies }) => {
  if (rentedMovies.length === 0) {
    return null;
  }

  return (
    <div className="rentals-section">
      <h2 className="rentals-title">Your Rentals</h2>
      <div className="rentals-list">
        {rentedMovies.map((movie) => (
          <div key={movie.id} className="rental-item">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rental-image"
            />
            <div className="rental-info">
              <h3 className="rental-title">{movie.title}</h3>
              <div className="rental-status">
                <Clock size={16} />
                <span>Rented • Due in 48 hours</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};