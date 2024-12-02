import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { MovieGrid } from "./components/MovieGrid";
import { SearchBar } from "./components/SearchBar";
import { FilterBar } from "./components/FilterBar";
import { RentedMoviesList } from "./components/RentedMoviesList";
import CartPage from "./components/CartPage"; // Import CartPage
import "./styles/global.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]); // Manage movies state locally
  const [rentedMovies, setRentedMovies] = useState([]);
  const [cart, setCart] = useState([]); // Cart state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        const moviesWithAvailability = response.data.map((movie) => ({
          ...movie,
          isAvailable: movie.isAvailable !== false, // Default to true if undefined
        }));
        setMovies(moviesWithAvailability);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchMovies();
  }, []);
  

  // Handle renting a movie
  const handleRentMovie = (movie) => {
    if (movie.isAvailable) {
      // Update availability
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.MovieID === movie.MovieID ? { ...m, isAvailable: false } : m
        )
      );
      setRentedMovies((prev) => [...prev, movie]);
    }
  };

  // Handle adding a movie to the cart
  const handleAddToCart = (movie) => {
    if (!cart.some((m) => m.MovieID === movie.MovieID)) {
      setCart((prevCart) => [...prevCart, movie]);
    }
  };

  // Filter movies based on search term and genre
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

  return (
    <BrowserRouter>
      <div className="app">
        <Header cart={cart} />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
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
                <MovieGrid
                  movies={filteredMovies}
                  onRentMovie={(movie) => {
                    handleRentMovie(movie);
                    handleAddToCart(movie); // Add movie to cart
                  }}
                />
                <RentedMoviesList rentedMovies={rentedMovies} />
              </main>
            }
          />
          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                setCart={setCart}
                movies={movies}
                setMovies={setMovies} // Pass movies and setMovies to CartPage
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
