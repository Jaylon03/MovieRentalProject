import React from "react";
import "../styles/MovieCard.css";

export const MovieCard = ({ movie, onRent }) => (
  <div className="movie-card">
    <img
      src={movie.poster_url}
      alt={movie.Title || "Untitled Movie"}
      className="movie-image"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/200x300";
      }}
    />
    <div className="movie-content">
      <h3 className="movie-title">{movie.Title || "Untitled Movie"}</h3>
      <div className="movie-footer">
        <button
          className="rent-button"
          onClick={() => onRent(movie)}
          disabled={!movie.isAvailable}
        >
          {movie.isAvailable ? "Rent Now" : "Unavailable"}
        </button>
      </div>
    </div>
  </div>
);
