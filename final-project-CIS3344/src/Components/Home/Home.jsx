import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/footer';

const apiKey = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch movies
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
        setLoading(false); // Set loading to false when movies are fetched
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    // Fetch user reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(savedReviews);

    // Fetch movies when the component mounts
    fetchMovies();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const matched = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(matched);
    // Save search query to localStorage
    localStorage.setItem("searchQuery", query);
  };

  // Handle movie click
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  // Handle query input change
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Check if the user has reviewed this movie
  const getUserReview = (movieId) => {
    return reviews[movieId] ? reviews[movieId].review : "No review yet";
  };

  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.content}>
        <h1>Welcome, {username}!</h1>
        <p>Explore and review your favorite movies!</p>

        <div className={styles.searchContainer}>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search movies..."
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>

        <h2>{query ? `Results for "${query}"` : "Popular Movies:"}</h2>

        {loading ? (
          <p>Loading movies...</p> // Show loading text while fetching
        ) : (
          <div className={styles.movieList}>
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={styles.movieCard}
                onClick={() => handleMovieClick(movie)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p><strong>Your Review:</strong> {getUserReview(movie.id)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
