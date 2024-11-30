import React from "react";
import "../styles/MovieGrid.css";
import { MovieCard } from "./MovieCard";

export const MovieGrid = ({ movies, onRentMovie }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.MovieID} movie={movie} onRent={onRentMovie} />
      ))}
    </div>
  );
};
