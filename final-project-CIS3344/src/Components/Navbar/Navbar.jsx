import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUsername('');
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1>Movie App</h1>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>

        {username && (
          <>
            <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
