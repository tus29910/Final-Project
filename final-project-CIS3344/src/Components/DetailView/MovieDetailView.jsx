import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navBar';
import styles from './MovieDetailView.module.css';

const MovieDetailView = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [reviewText, setReviewText] = useState('');
    const [starRating, setStarRating] = useState(0);

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

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log('User review:', reviewText);
        console.log('User rating:', starRating);
        setReviewText('');
        setStarRating(0);
    };

    const StarRatingDisplay = ({ rating }) => {
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className={styles.starRatingDisplay}>
                {Array(fullStars).fill('★').map((s, i) => <span key={`full-${i}`} className={styles.star}>★</span>)}
                {halfStar && <span className={styles.star}>☆</span>}
                {Array(emptyStars).fill('☆').map((s, i) => <span key={`empty-${i}`} className={styles.star}>☆</span>)}
                <span className={styles.ratingText}>({rating.toFixed(1)} / 10)</span>
            </div>
        );
    };

    const StarSelector = ({ selectedRating, onChange }) => {
        return (
            <div className={styles.starSelector}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`${styles.star} ${selectedRating >= star ? styles.active : ''}`}
                        onClick={() => onChange(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

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
                    <div className={styles.reviewForm}>
                    <h3>Leave a Review</h3>
                    <form className={styles.form} onSubmit={handleReviewSubmit}>
                        <StarSelector selectedRating={starRating} onChange={setStarRating} />
                        <textarea
                            placeholder="Write your review here..."
                            className={styles.textarea}
                            rows="6"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                        <button type="submit" className={styles.button}>Submit Review</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailView;
