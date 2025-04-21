import React, { useState } from 'react';
import styles from './Review.module.css';

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

const Review = ({ onSubmit }) => {
    const [reviewText, setReviewText] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reviewText || starRating === 0) return;

        onSubmit({ reviewText, starRating });
        setReviewText('');
        setStarRating(0);
    };

    return (
        <div className={styles.reviewForm}>
            <h3>Leave a Review</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
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
    );
};

export default Review;
