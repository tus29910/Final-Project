import React from 'react';
import moviesData from '../../Data/movies.json';
import Navbar from '../Navbar/navBar';
import styles from './MovieDetailView.module.css';

const MovieDetailView = () => {
    const movie = moviesData[0];

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
                        <p><strong>Genre:</strong> {movie.type}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <p><strong>Overview:</strong> {movie.description}</p>

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
