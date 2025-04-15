import React, {useState, useEffect} from "react";
import Login from "./Login/Login";

const MovieRecommendation = () =>{
    const username = localStorage.getItem("username");
    const[likeMovies, setLikedMovies] = useState([]);
    const[recommendedMovies, setRecommendedMovies] = useState([]);
    const[movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.example.com/movies")
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error fetching movies:", error));

        const savedLikes = localStorage.getItem(`liked_${username}`);
        if (savedLikes){
            setLikedMovies(JSON.parse(savedLikes));
        }
    }, [username]);

    const handleLikeMovie = (movie) =>{
        if(!likeMovies.some(m => m.id === movie.id)){
            const updatedLikedMovies =[...likedMovies, movie];
            setLikedMovies(updatedLikedMovies);
            localStorage.setItem(`liked_${username}`, JSON.stringify(updatedLikedMovies));

            const recommendations = movies.filter(
                (m) => m.id !== movie.id && (m.genre === movie.genre || m.director === movie.director)
            );
            setRecommendedMovies(recommendations);
        }
    };

    return (
        <div>
            <h2>Welcome, {username}Movie List</h2>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <div key={movie.id}>
                        <p>{movie.title} ({movie.genre})</p>
                        <button onClick={() => handleLikeMovie(movie)}>Like</button>
                    </div>
                ))
            ) : (
                <p>Loading movies...</p>
            )}

            <h2>Recommended Movies</h2>
            {recommendedMovies.length > 0 ? (
                recommendedMovies.map((movie) => (
                    <p key={movie.id}>{movie.title} ({movie.genre})</p>
                ))
            ) : (
                <p>No recommendations yet. Like a movie to get suggestions!</p>
            )}
        </div>
    );
};

export default MovieRecommendation;