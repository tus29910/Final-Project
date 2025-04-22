import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignupPage from './Components/Signup/Signup';
import MovieDetailView from './Components/DetailView/MovieDetailView';
import About from './Components/About/About';

const apiKey = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, []);

  const currentUser = {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    profile_picture: null,
    bio: "This is your profile.",
    rated_movies: []
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile user={currentUser} movies={movies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/movie/:id" element={<MovieDetailView />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
