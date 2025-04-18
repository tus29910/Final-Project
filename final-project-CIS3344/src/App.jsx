import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignupPage from './Components/Signup';
import MovieDetailView from './Components/DetailView/MovieDetailView';
import movies from './data/movies.json';

function App() {
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
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile user={currentUser} movies={movies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetailView />} />
      </Routes>
    </Router>
  );
}

export default App;
