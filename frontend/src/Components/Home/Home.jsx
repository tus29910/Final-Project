import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/footer';


const apiKey = import.meta.env.VITE_API_KEY
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [reviewInputs, setReviewInputs] = useState({});
  const navigate = useNavigate();
  const [username, setUsername] = useState('');


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }


    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };


    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${storedUsername}`)) || {};
    setReviews(savedReviews);


    fetchMovies();
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    const matched = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(matched);
    localStorage.setItem("searchQuery", query);
  };


  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };


  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };


  const getUserReview = (movieId) => {
    return reviews[movieId]?.text || "No review yet";
  };


  const handleReviewInputChange = (movieId, value) => {
    setReviewInputs({ ...reviewInputs, [movieId]: value });
  };


  const handleReviewSubmit = (movie) => {
    const newReview = {
      text: reviewInputs[movie.id] || "",
      genre_ids: movie.genre_ids,
    };


    const updatedReviews = {
      ...reviews,
      [movie.id]: newReview,
    };


    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${username}`, JSON.stringify(updatedReviews));
    setReviewInputs({ ...reviewInputs, [movie.id]: "" });


    // Recommend other movies with at least one matching genre
    const recommended = movies.filter(m =>
      m.id !== movie.id && m.genre_ids.some(g => movie.genre_ids.includes(g))
    );
    setRecommendations(recommended);
  };


  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.content}>
        <h1>Welcome, {username}</h1>
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
          <p>Loading movies...</p>
        ) : (
          <div className={styles.movieList}>
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={styles.movieCard}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                  onClick={() => handleMovieClick(movie)}
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p><strong>Your Review:</strong> {getUserReview(movie.id)}</p>


                <textarea
                  placeholder="Write a review..."
                  value={reviewInputs[movie.id] || ""}
                  onChange={(e) => handleReviewInputChange(movie.id, e.target.value)}
                  className={styles.reviewInput}
                />
                <button onClick={() => handleReviewSubmit(movie)} className={styles.submitReview}>
                  Submit Review & Get Recommendations
                </button>
              </div>
            ))}
          </div>
        )}


        {recommendations.length > 0 && (
          <div className={styles.recommendationSection}>
            <h2>Recommended Based on Your Review</h2>
            <div className={styles.movieList}>
              {recommendations.map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                    onClick={() => handleMovieClick(movie)}
                  />
                  <h3>{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};


export default Home;
