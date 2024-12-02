import React from "react";

export const RentedMoviesList = ({ rentedMovies }) => {
  return (
    <div>
      <h2>Rented Movies</h2>
      <div>
        {rentedMovies.map((movie, index) => (
          <div key={movie.MovieID || index}>
            <h3>{movie.Title}</h3>
            <p>{movie.Genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
