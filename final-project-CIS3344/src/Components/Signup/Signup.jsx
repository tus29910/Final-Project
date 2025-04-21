import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Signup.module.css';
import Navbar from "../Navbar/Navbar";

const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [birth, setBirth] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const signupForm = () => {
        if (!password || password !== newPassword) {
            setError("Password is required and should match");
            return;
        }

        // Save user info (mocked for now)
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("username", username);
        setError("");
        alert("Account created successfully!");
        navigate("/home");
    };

    return (
        <div className={styles.signupPage}>
            <Navbar />
            <div className={styles.signupContainer}>
                <div className={styles.signupBox}>
                    <h1 className={styles.signupHeader}>Create A New Account</h1>
                    {error && <p className={styles.signupError}>{error}</p>}

                    <form className={styles.signupForm} onSubmit={(e) => { e.preventDefault(); signupForm(); }}>
                        <label>First Name:</label>
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

                        <label>Last Name:</label>
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

                        <label>Email:</label>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Username:</label>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} required />

                        <label>Password:</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label>Confirm Password:</label>
                        <input type="password" placeholder="Confirm Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                        <label>Birth Date:</label>
                        <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required />

                        <label>Phone Number:</label>
                        <input type="tel" placeholder="Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required />

                        <button type="submit" className={styles.signupButton}>Submit</button>
                    </form>

                    <p className={styles.signupFooter}>
                        Already have an account? <Link to="/login">Login Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
