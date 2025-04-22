import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [reviewsMap, setReviewsMap] = useState({});
  const [query, setQuery] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser?.username) {
      setUsername(storedUser.username);
      const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      const myReviews = allReviews.filter(r => r.username === storedUser.username);
      const map = {};
      myReviews.forEach(r => {
        map[r.movieId] = r.reviewText;
      });
      setReviewsMap(map);
    }
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${backendURL}/api/movies/popular`);
        const data = await res.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [backendURL]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setFilteredMovies(movies);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${backendURL}/api/movies/search?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setFilteredMovies(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setFilteredMovies(movies);
  };

  const renderReviewLine = (movieId) => {
    if (!username) {
      return <em>Create an account to leave a review.</em>;
    }
    const text = reviewsMap[movieId] || "No review yet";
    return <span><strong>Your Review:</strong> {text}</span>;
  };

  const handleMovieClick = (movie) =>
    navigate(`/movie/${movie.id}`, { state: { movie } });

  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.content}>
        <h1>Welcome {username || "Guest"}</h1>
        <p>Explore and review your favorite movies!</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchForm}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search movies..."
              className={styles.searchInput}
            />
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleSearch}
                className={styles.searchButton}
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className={styles.resetButton}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <h2>{query ? `Results for "${query}"` : "Popular Movies:"}</h2>
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div className={styles.movieList}>
            {filteredMovies.map(movie => (
              <div
                key={movie.id}
                className={styles.movieCard}
                style={{ cursor: 'pointer' }}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>{renderReviewLine(movie.id)}</p>
              </div>
            ))}
          </div>
        )}
        <div className={styles.pastReviewsSection}>
          <h2>Your Past Reviews</h2>
          {username ? (
            Object.keys(reviewsMap).length > 0 ? (
              <div className={styles.movieList}>
                {Object.entries(reviewsMap).map(([id, text]) => {
                  const movie = movies.find(m => m.id === Number(id));
                  return (
                    <div key={id} className={styles.movieCard}>
                      {movie?.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className={styles.moviePoster}
                          onClick={() => movie && handleMovieClick(movie)}
                        />
                      )}
                      <h3>{movie?.title || `Movie ${id}`}</h3>
                      <p>{text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>You haven’t reviewed any movies yet.</p>
            )
          ) : (
            <p>Create an account to start leaving reviews.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
