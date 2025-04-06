import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MovieDetailView from './Components/DetailView/MovieDetailView';
import users from './data/users.json';
import movies from './data/movies.json';

function App() {
  const currentUser = users[0];
  // Replace with login state later

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={currentUser} movies={movies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movieDetailView" element={<MovieDetailView />} />        
      </Routes>
    </Router>
  );
}

export default App;
