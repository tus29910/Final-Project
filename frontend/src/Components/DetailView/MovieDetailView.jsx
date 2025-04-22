import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Review from '../Review/Review';
import styles from './MovieDetailView.module.css';

const genreMap = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

export default function MovieDetailView() {
  const { state }   = useLocation();
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [movie, setMovie]     = useState(state?.movie || null);
  const [reviews, setReviews] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (movie?.id) {
      const all = JSON.parse(localStorage.getItem("reviews")) || [];
      setReviews(all.filter(r => r.movieId === movie.id));
    }
  }, [movie]);

  useEffect(() => {
    const needsFetch =
      !movie ||
      (!movie.genre_ids && !movie.genres);

    if (needsFetch) {
      (async () => {
        try {
          const res = await fetch(`${backendURL}/api/movies/${id}`);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.error("Failed to fetch full movie details:", err);
        }
      })();
    }
  }, [id, movie, backendURL]);

  const renderGenres = () => {
    if (movie.genres?.length) {
      return movie.genres.map(g => g.name).join(', ');
    }
    if (movie.genre_ids?.length) {
      return movie.genre_ids.map(i => genreMap[i] || "Unknown").join(', ');
    }
    return "N/A";
  };

  if (!movie) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.wrapper}>
          <p>Loading movie details…</p>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = ({ reviewText, starRating }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;
    const all = JSON.parse(localStorage.getItem("reviews")) || [];
    const idx = all.findIndex(
      r => r.movieId === movie.id && r.username === currentUser.username
    );
    const newReview = {
      movieId: movie.id,
      username: currentUser.username,
      reviewText,
      starRating,
      timestamp: Date.now(),
    };
    if (idx >= 0) all[idx] = newReview;
    else all.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(all));
    setReviews(all.filter(r => r.movieId === movie.id));
  };

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
            <p><strong>Genre:</strong> {renderGenres()}</p>
            <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? "N/A"} / 10</p>
            <p><strong>Overview:</strong> {movie.overview || "No overview available."}</p>

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
      <Footer />
    </div>
  );
}
