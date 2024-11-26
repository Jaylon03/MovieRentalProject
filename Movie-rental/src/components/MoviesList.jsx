import React, { useEffect, useState } from "react";
import axios from "axios";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from the backend
    axios.get("http://localhost:3000/movies")
      .then((response) => {
        setMovies(response.data); // Set the movies data
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.MovieID}>
            {movie.Title} - {movie.Genre} (${movie.Price}, {movie.Year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
