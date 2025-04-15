import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from './Signup.module.css';


const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [birth, setBirth] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [error, setError] = useState("");

    const signupForm = () =>{
        if(!password || password !== newPassword){
            setError("Password is required and should match");
            return;
        }

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        setError("");
        alert("Account created successfully!")
    };

    return(
        <div className = "styles.Container">
            <h1 className = {styles.Header}>Create A New Account</h1>
            {error && <p>{error}</p>}
            <label>First Name </label>
            <input type="text" placeholder="First Name" value={firstName} required onChange={(e) => setFirstName(e.target.value) }/>
            <label>Last Name </label>
            <input type="text" placeholder="Last Name" value={lastName} required onChange={(e) => setLastName(e.target.value)}/>
            <label>Email </label>
            <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
            <label>Username </label>
            <input type="username" placeholder="Username" value={username} required onChange ={(e) => setUsername(e.target.value)}/>
            <label>Password </label>
            <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
            <label>New Password </label>
            <input type="password" placeholder="Confirm Password" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)}/>
            <label>Birth Date </label>
            <input type="date" placeholder="date" value={birth} required onChange={(e) => setBirth(e.target.value)}/>
            <label>Phone Number </label>
            <input type="number" placeholder="### ### ####" value={phoneNum} required onChange={(e) => setPhoneNum(e.target.value)}/>

            <button onClick={signupForm}>Submit</button>

            <p className="styles.loginLink">
                Already have an account? <Link to="/login">Login Here</Link>
            </p>
        </div>
    )
}

export default SignupPage;