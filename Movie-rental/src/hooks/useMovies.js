import { useState, useEffect } from "react";
import axios from "axios";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [rentedMovies, setRentedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        console.log("Movies fetched from backend:", response.data);

        // Ensure `isAvailable` defaults to true if missing
        setMovies(
          response.data.map((movie) => ({
            ...movie,
            isAvailable: movie.isAvailable !== undefined ? movie.isAvailable : true,
          }))
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleRentMovie = (movie) => {
    if (!movie.isAvailable) return;

    // Update movie availability in state
    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.MovieID === movie.MovieID ? { ...m, isAvailable: false } : m
      )
    );

    // Add to rentedMovies list
    setRentedMovies((prev) => [...prev, { ...movie, isAvailable: false }]);
  };

  return {
    movies,
    rentedMovies,
    handleRentMovie,
  };
};
