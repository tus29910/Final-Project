import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Navbar from '../Navbar/navBar';

const API_URL =`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const apiKey = import.meta.env.ANTONIO_VITE_API_KEY;


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    const matched = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(matched);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  }

  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.content}>
        <h2>Welcome to the Movie App</h2>
        <p>Explore and review your favorite movies!</p>

        <form onSubmit={handleSearch} className={styles.searchInput}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>

        <h2>{query ? `Results for "${query}"` : "Popular Movies:"}</h2>

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
      </main>

      <footer className={styles.footer}>
        <p>Temple CIS 3344 Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
