import React, { useState, useEffect } from 'react';
import moviesData from '../data/movies.json';
import './MovieSearch.css';

const genreLookup = {
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
  37: 'Western',
};

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const top5 = [...moviesData].sort((a, b) => b.rating - a.rating).slice(0, 5);
    setFilteredMovies(top5);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const matched = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(matched);
  };

  const handleRating = (movieId, value) => {
    setRatings((prev) => ({ ...prev, [movieId]: value }));
  };

  return (
    <div className="movie-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          required
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>
        {query ? `Search Results for "${query}"` : 'Top 5 Movies'}
      </h2>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-content">
              <div>
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-text">
                  Genres: {movie.genre_ids.map((id) => genreLookup[id] || 'Unknown').join(', ')}
                </p>
                <p className="movie-text">Type: {movie.type}</p>
                <p className="movie-description">{movie.description}</p>
              </div>

              <div className="movie-rating">
                Your Rating:
                <select
                  value={ratings[movie.id] || ''}
                  onChange={(e) => handleRating(movie.id, e.target.value)}
                  className="rating-select"
                >
                  <option value="">Rate</option>
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="5">5 ⭐</option>
                </select>
                {ratings[movie.id] && (
                  <p style={{ color: '#16a34a', marginTop: '4px' }}>
                    You rated: {ratings[movie.id]} ⭐
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
