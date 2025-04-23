import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Review from '../Review/Review';
import styles from './MovieDetailView.module.css';

const MovieDetailView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie;

  const genreIds = movie
    ? (movie.genre_ids ?? movie.genres?.map(g => g.id) ?? [])
    : [];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (movie) {
      const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      const movieReviews = allReviews.filter((r) => r.movieId === movie.id);
      setReviews(movieReviews);
    }
  }, [movie]);

  const handleReviewSubmit = ({ reviewText, starRating }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const existingIndex = allReviews.findIndex(
      (rev) => rev.movieId === movie.id && rev.username === currentUser.username
    );

    const newReview = {
      movieId: movie.id,
      username: currentUser.username,
      reviewText,
      starRating,
      timestamp: Date.now(),
    };

    if (existingIndex >= 0) {
      allReviews[existingIndex] = newReview;
    } else {
      allReviews.push(newReview);
    }

    localStorage.setItem("reviews", JSON.stringify(allReviews));
    setReviews(allReviews.filter((r) => r.movieId === movie.id));
  };

  const genreMap = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
    9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
  };

  const getGenres = (ids) => ids.map(id => genreMap[id]).join(', ');

  if (!movie) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.wrapper}>
          <h2>Movie not found!</h2>
          <button onClick={() => navigate(-1)} className={styles.button}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.movieInfoCard}>
          <div className={styles.posterSection}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <h1 className={styles.title}>{movie.title}</h1>
          </div>
          <div className={styles.details}>
            <p><strong>Genre:</strong> {getGenres(genreIds)}</p>
            <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
            <p><strong>Overview:</strong> {movie.overview}</p>

            <h3>User Reviews:</h3>
            {reviews.length > 0 ? (
              <ul className={styles.reviews}>
                {reviews.map((r, idx) => (
                  <li key={idx}>
                    <strong>{r.username}</strong>: "{r.reviewText}" – {r.starRating}/5
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to leave one!</p>
            )}
          </div>
        </div>

        <Review onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default MovieDetailView;
