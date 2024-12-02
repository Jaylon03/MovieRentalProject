import React from "react";
import { Star } from "lucide-react"; // Import star icon
import "../styles/MovieCard.css";

export const MovieCard = ({ movie, onRent }) => {
  const genres = movie.Genre?.split(", ") || ["N/A"];

  return (
    <div className="movie-card">
      <img
        src={movie.poster_url || "https://via.placeholder.com/200x300"}
        alt={movie.Title || "Untitled Movie"}
        className="movie-image"
      />
      <div className="movie-content">
        <h3 className="movie-title">{movie.Title || "Untitled Movie"}</h3>
        <div className="movie-info">
          <span className="movie-year">{movie.Year || "N/A"}</span>
          <div className="genres">
            {genres.map((genre, index) => (
              <span key={index} className="movie-genre">
                {genre}
              </span>
            ))}
          </div>
          <div className="movie-rating">
          <strong>Rating:</strong> 
            <Star size={16} color="#facc15" fill="#facc15" /> {/* Star icon */}
            <span>{parseFloat(movie.rating || 0).toFixed(1)}</span>
          </div>
        </div>
        <div className="movie-footer">
          <span className="movie-price">
            ${parseFloat(movie.Price || 0).toFixed(2)}
          </span>
          <button
            className="rent-button"
            onClick={() => onRent(movie)}
            disabled={!movie.isAvailable} // Disable if unavailable
          >
            {movie.isAvailable ? "Rent Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};
