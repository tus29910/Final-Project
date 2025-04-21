import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import Navbar from "../Navbar/Navbar";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if(savedUsername){
            setUserName(savedUsername);
        }
    }, []);

    const handleLogin = () => {
        const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
        const savedUsername = savedUserDetails?.username;
        const savedPassword = savedUserDetails?.password;

        if (!username || !password){
            setError("Username and password are required");
            return;
        }

        if(username !== savedUsername || password !== savedPassword) {
            setError("Invalid Login");
            return;
        }

        setError("");
        alert(`Welcome ${username}`);
        localStorage.setItem("username", username);  // Save username for the session
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
