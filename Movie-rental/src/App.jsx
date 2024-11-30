import React, { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { MovieGrid } from "./components/MovieGrid";
import { SearchBar } from "./components/SearchBar";
import { FilterBar } from "./components/FilterBar";
import { RentedMoviesList } from "./components/RentedMoviesList";
import { useMovies } from "./hooks/useMovies";
import "./styles/global.css";

function App() {
  const { movies, rentedMovies, handleRentMovie } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [cart, setCart] = useState([]); // Cart state

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        movie.Title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesGenre =
        selectedGenre === "All" ||
        movie.Genre?.toLowerCase() === selectedGenre.toLowerCase();

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  // Handle adding a movie to the cart
  const handleAddToCart = (movie) => {
    setCart((prevCart) => [...prevCart, movie]);
  };

  return (
    <div className="app">
      <Header cart={cart} /> {/* Pass cart to Header */}
      <main className="container">
        <div className="main-header">
          <h2 className="page-title">Movie Collection</h2>
          <div className="filters">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterBar
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
          </div>
        </div>
        <MovieGrid movies={filteredMovies} onRentMovie={(movie) => {
          handleRentMovie(movie);
          handleAddToCart(movie); // Add to cart when rented
        }} />
        <RentedMoviesList rentedMovies={rentedMovies} />
      </main>
    </div>
  );
}

export default App;
