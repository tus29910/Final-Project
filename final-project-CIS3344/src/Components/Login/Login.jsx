import React, { useState } from "react";
import styles from './Login.module.css';
import Navbar from "../Navbar/navBar";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!username || !password) {
            setError("Username and password are required");
            return;
        }
        setError("");
        alert(`Welcome, ${username}`);
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
                </div>
            </div>
        </div>
    );
};

export default Login;
