import React from 'react';
import moviesData from '../../Data/movies.json';
import Navbar from '../Navbar/navBar';


const MovieDetailView = () => {

    console.log(moviesData[0])

    const movieTitle = moviesData[0].title;
    const moviePoster = moviesData[0].poster_path;
    const movieRating = moviesData[0].rating;
    const movieDescription = moviesData[0].description;
    const movieType = moviesData[0].type;
    return (
        <div>
            <Navbar />
            <h1>{movieTitle}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${moviePoster}`} alt={movieTitle} />
            <p>Genre: {movieType}</p>
            <p>Rating: {movieRating}</p>
            <p>Overview: {movieDescription}</p>
            <h3>User Reviews:</h3>
            <ul>
                <li>Review 1: This movie was fantastic!</li>
                <li>Review 2: I didn't like the ending.</li>
                <li>Review 3: Great performances by the cast.</li>
            </ul>
            <h3>Write a review: </h3>
            <form>
                <textarea placeholder="Write your review here..." rows="4" cols="50"></textarea>
                <br />
                <button type="submit">Submit Review</button>
            </form>
            <h3>Trailer</h3>
            <p>Watch the trailer here: <a href="https://www.youtube.com/watch?v=example">YouTube Link</a></p>
        </div>
    );
};

export default MovieDetailView;