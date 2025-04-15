import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navBar';
import styles from './MovieDetailView.module.css';

const MovieDetailView = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const movie = state?.movie;

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

    console.log(movie);

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
                        <p><strong>Genre:</strong> {getGenres(movie.genre_ids)}</p>
                        <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
                        <p><strong>Overview:</strong> {movie.overview}</p>

                        <h3>User Reviews:</h3>
                        <ul className={styles.reviews}>
                            <li>This movie was fantastic!</li>
                            <li>I didn't like the ending.</li>
                            <li>Great performances by the cast.</li>
                        </ul>

                        <h3>Trailer</h3>
                        <a
                            href="https://www.youtube.com/watch?v=example"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch on YouTube
                        </a>
                    </div>
                </div>
                <div className={styles.reviewForm}>
                    <h3>Leave a Review</h3>
                    <form className={styles.form}>
                        <textarea
                            placeholder="Write your review here..."
                            className={styles.textarea}
                            rows="6"
                        ></textarea>
                        <button type="submit" className={styles.button}>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailView;
