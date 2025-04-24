import React, { useEffect, useState } from "react";


const MovieRecommendation = ({ movies }) => {
    const username = localStorage.getItem("username");
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState({});
    const [recommendations, setRecommendations] = useState([]);


    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem(`reviews_${username}`)) || [];
        setReviews(savedReviews);
    }, [username]);


    const handleReviewSubmit = (movie) => {
        const newReview = {
            movieId: movie.id,
            title: movie.title,
            genre: movie.genre,
            text: reviewText[movie.id]
        };


        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews_${username}`, JSON.stringify(updatedReviews));


        setReviewText({ ...reviewText, [movie.id]: "" });


        // Recommend more movies with the same genre
        const similarMovies = movies.filter(
            (m) => m.genre === movie.genre && m.id !== movie.id
        );
        setRecommendations(similarMovies);
    };


    return (
        <div>
            <h2>Review & Get Movie Recommendations</h2>
            {movies.map((movie) => (
                <div key={movie.id} style={{ marginBottom: "20px" }}>
                    <h4>{movie.title} ({movie.genre})</h4>
                    <textarea
                        placeholder="Write a review..."
                        value={reviewText[movie.id] || ""}
                        onChange={(e) => setReviewText({ ...reviewText, [movie.id]: e.target.value })}
                    />
                    <button onClick={() => handleReviewSubmit(movie)}>Submit Review</button>
                </div>
            ))}


            {recommendations.length > 0 && (
                <div>
                    <h3>Recommended Movies Based on Your Review</h3>
                    <ul>
                        {recommendations.map((movie) => (
                            <li key={movie.id}>{movie.title} ({movie.genre})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MovieRecommendation;