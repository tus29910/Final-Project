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
  const [recommendations, setRecommendations] = useState([]);
  const [query, setQuery] = useState("");
  const [extraMovies, setExtraMovies] = useState({});

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.username) {
      setUsername(currentUser.username);
      const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      const myReviews = allReviews.filter(r => r.username === currentUser.username);
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
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [backendURL]);

  useEffect(() => {
    const reviewedIds = Object.keys(reviewsMap).map(id => Number(id));
  
    const allReviewedMovies = reviewedIds.map(
      id => movies.find(m => m.id === id) || extraMovies[id]
    );
  
    const allLoaded = allReviewedMovies.every(movie => movie !== undefined && movie !== null);
  
    if (!allLoaded) {
      console.log("⏳ Waiting for all reviewed movies to load...");
      return;
    }
  
    const genreSet = new Set();
    allReviewedMovies.forEach(movie => {
      if (movie?.genre_ids) {
        movie.genre_ids.forEach(g => genreSet.add(g));
      }
    });
  
    if (genreSet.size === 0) {
      console.log("🚫 No genres found in reviewed movies.");
      return;
    }
  
    const allMovies = [...movies, ...Object.values(extraMovies).filter(Boolean)];
  
    const recs = allMovies.filter(m =>
      !reviewedIds.includes(m.id) &&
      m.genre_ids.some(g => genreSet.has(g))
    );
  
    console.log("✅ Genre Set:", Array.from(genreSet));
    console.log("✅ Recommendations found:", recs.map(m => m.title));
  
    setRecommendations(recs);
  }, [reviewsMap, movies, extraMovies]);
  

  const fetchMovieById = async (id) => {
    try {
      const res = await fetch(`${backendURL}/api/movies/${id}`);
      if (!res.ok) {
        console.warn(`No movie ${id}:`, await res.json());
        setExtraMovies(prev => ({ ...prev, [id]: null }));
        return;
      }
      const data = await res.json();
      setExtraMovies(prev => ({ ...prev, [id]: data }));
    } catch (err) {
      console.error(`Failed to fetch movie ${id}`, err);
      setExtraMovies(prev => ({ ...prev, [id]: null }));
    }
  };
  

  useEffect(() => {
    const fetchMissingMovies = async () => {
      const reviewedIds = Object.keys(reviewsMap).map(id => Number(id));
      for (const id of reviewedIds) {
        const alreadyLoaded = movies.find(m => m.id === id) || extraMovies[id];
        if (!alreadyLoaded) {
          console.log("Fetching missing movie:", id);
          await fetchMovieById(id);
        }
      }
    };
    fetchMissingMovies();
  }, [reviewsMap, movies]);

  const handleSearch = async e => {
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
    } catch {
      setFilteredMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setFilteredMovies(movies);
  };

  const renderReviewLine = movieId => {
    if (!username) {
      return <em>Create an account to leave a review.</em>;
    }
    const text = reviewsMap[movieId] || "No review yet";
    return <span><strong>Your Review:</strong> {text}</span>;
  };

  const handleMovieClick = movie =>
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
                  const movieId = Number(id);
                  const movie = movies.find(m => m.id === movieId) 
                              || (extraMovies.hasOwnProperty(movieId) 
                                  ? extraMovies[movieId] 
                                  : undefined);          

                  return (
                    <div key={id} className={styles.movieCard}>
                      {movie === undefined ? (
                        <div className={styles.loadingPoster}>Loading poster…</div>
                      ) : movie === null ? (
                        <div className={styles.notFoundPoster}>Poster not available</div>
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className={styles.moviePoster}
                          onClick={() => handleMovieClick(movie)}
                        />
                      )}
                      <h3>
                        {movie === undefined
                          ? `Loading movie ${id}…`
                          : movie === null
                            ? `Movie ${id} not found`
                            : movie.title}
                      </h3>
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

        {recommendations.length > 0 && (
          <div className={styles.recommendationSection}>
            <h2>Recommended For You</h2>
            <div className={styles.movieList}>
              {recommendations.map(movie => (
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
