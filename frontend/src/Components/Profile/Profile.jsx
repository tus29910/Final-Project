import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieTitles, setMovieTitles] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const storedMovies = JSON.parse(localStorage.getItem("allMovies")) || [];

    if (currentUser) {
      setUser(currentUser);
      const reviews = allReviews.filter(r => r.username === currentUser.username);
      setUserReviews(reviews);
    }

    if (storedMovies.length) {
      setMovies(storedMovies);
    }
  }, []);

  useEffect(() => {
    const fetchMissingMovies = async () => {
      const newTitles = {};

      for (const review of userReviews) {
        const existing = movies.find((m) => m.id === review.movieId);
        if (existing) {
          newTitles[review.movieId] = existing.title;
          continue;
        }

        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${review.movieId}?api_key=${import.meta.env.VITE_API_KEY}`);
          const data = await response.json();
          newTitles[review.movieId] = data.title;
        } catch (error) {
          console.error("Error fetching movie title:", error);
          newTitles[review.movieId] = "Unknown Movie";
        }
      }

      setMovieTitles(newTitles);
    };

    if (userReviews.length) {
      fetchMissingMovies();
    }
  }, [userReviews, movies]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, profile_picture: reader.result };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className={styles.profile}>
        <Navbar />
        <main className={styles.profileContentWrapper}>
          <div className={styles.profileContent}>
            <h2>User not found or not logged in.</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <Navbar />
      <main className={styles.profileContentWrapper}>
        <div className={styles.profileContent}>
          <div className={styles.profileInfo}>
            <h2>Profile</h2>
            <img
              src={user.profile_picture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className={styles.profilePicture}
            />
            <input
              type="file"
              accept="image/*"
              id="profileUpload"
              className={styles.fileInput}
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profileUpload" className={styles.uploadButton}>
              Change Profile Picture
            </label>
            <p className={styles.username}>Welcome, {user.username}!</p>
          </div>

          <div className={styles.reviews}>
            <h2>Your Reviews</h2>
            {userReviews.length > 0 ? (
              <ul className={styles.reviewList}>
                {userReviews.map((review, index) => (
                  <li key={index}>
                    <strong>{movieTitles[review.movieId] || 'Loading...'}</strong>: "{review.reviewText}" – {review.starRating}/5
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
