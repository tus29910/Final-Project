import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1>Movie App</h1>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {!currentUser && <li><Link to="/login">Login</Link></li>}
          <li><Link to="/about">About</Link></li>
        </ul>

        {currentUser && (
          <button onClick={handleSignOut} className={styles.signOutButton}>
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
