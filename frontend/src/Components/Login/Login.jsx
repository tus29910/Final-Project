import React, { useState, useEffect } from "react";
import styles from './Login.module.css';
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if(savedUsername){
            setUserName(savedUsername);
        }
    }, []);

    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
          setError("Username and password are required");
          return;
        }
      
        const users = JSON.parse(localStorage.getItem("users")) || [];
      
        const matchingUser = users.find(
          (user) => user.username === username && user.password === password
        );
      
        if (!matchingUser) {
          setError("Invalid Login");
          return;
        }
      
        localStorage.setItem("currentUser", JSON.stringify(matchingUser));
        setError("");
        alert(`Welcome ${username}`);
        navigate("/home");
      };
      

    return (
        <div className={styles.loginPage}>
            <Navbar />
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <h1 className={styles.loginTitle}>User Login</h1>
                    {error && <p className={styles.loginError}>{error}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.loginInput}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.loginInput}
                    />
                    <button onClick={handleLogin} className={styles.loginButton}>
                        Login
                    </button>

                    <p className={styles.signupLink}>
                        Don't have an account? <Link to="/signup">Sign Up Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
