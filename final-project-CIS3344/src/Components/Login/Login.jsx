import React, { useState, useEffect } from "react";
import styles from './Login.module.css';
import Navbar from "../Navbar/navBar";
import { Link } from "react-router-dom";

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

    const handleLogin = () => {
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (!username || !password){
            setError("Username and password are required");
            return;
        }

        if(username !== savedEmail || password !== savedPassword)
        {
            setError("Invalid Login");
            return;
        }

        setError("");
        alert(`Welcome ${username}`);
        localStorage.setItem("username", username);
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
