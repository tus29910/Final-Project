import React, {useState} from "react";
import React from "./Components/Login.jsx";

const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [birth, setBirth] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [error, setError] = useState("");

    const signupForm = () =>{
        if(!password || password !== newPassword){
            setError("Password is required and should match");
            return
        }
        setError("");
    };

    return(
        <div className = "styles.Container">
            <h1 className = "styles.Header">Create A New Account</h1>
            {error && <p>{error}</p>}
            <label text = "text">First Name: </label>
            <input type="text" placeholder="firstName" value={firstName} required onchange={(e) => setFirstName(e.target.value) }/>
            <label text = "text">Last Name: </label>
            <input type="text" placeholder="lastName" value={lastName} required onchange={(e) => setLastName(e.target.value)}/>
            <label text = "text">Email: </label>
            <input type="email" placeholder="Email" value={email} required onchange={(e) => setEmail(e.target.value)}/>
            <label text = "text">Password: </label>
            <input type="password" placeholder="Password" value={password} required onchange={(e) => setPassword(e.target.value)}/>
            <label text = "text">New Password: </label>
            <input type="password" placeholder="newPassword" value={newPassword} required onchange={(e) => setNewPassword(e.target.value)}/>
            <label text = "text">Birth Date: </label>
            <input type="date" placeholder="date" value={birth} required onchange={(e) => setBirth(e.target.value)}/>
            <label text = "text">Phone Number: </label>
            <input type="number" placeholder="phoneNum" value={phoneNum} required onchange={(e) => setPhoneNum(e.target.value)}/>

            <button onclick={signupForm}>Submit</button>
        </div>
    )
}

export default SignupPage;