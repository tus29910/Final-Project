import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/footer';

const apiKey = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchMovies();
  }, []);
  

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.toLowerCase();
    const matched = movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(q);
      const genreMatch = movie.genre_ids.some(
        (id) => genreMap[id]?.toLowerCase().includes(q)
      );
      return titleMatch || genreMatch;
    });
    setFilteredMovies(matched);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.content}>
        <h1>Welcome {username}</h1>
        <p>Explore and review your favorite movies!</p>

        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
                if (value === '') {
                  setFilteredMovies(movies);
                }
              }}
              placeholder="Search by title or genre..."
              className={styles.searchInput}
            />
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.searchButton}>Search</button>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilteredMovies(movies);
                }}
                className={styles.resetButton}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <h2 className={styles.sectionHeader}>
          {query ? `Results for: ${query}` : "Popular Movies"}
        </h2>

        {filteredMovies.length === 0 ? (
          <p>No movies found for "{query}"</p>
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
