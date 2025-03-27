import React, {useState} from "react";
import styles from  './Login.module.css';

const loginPage = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if(!username || !password){
            setError("Username and password are required");
            return;
        }
        setError("");
        alert(`Welcome, ${username}`);
    };

    return(
        <div className = "styles.loginContainer">
            <div className = "styles.loginBox">
                <h1 className = "styles.loginTitle">User Login</h1>
                {error && <p>{error}</p>}
                <input type="text" placeholder="Username" value={username} onchange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onchange={(e) => setPassword(e.target.value)}/>
                <button onclick ={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default loginPage;