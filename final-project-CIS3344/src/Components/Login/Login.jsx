import React, {useState} from "react";
import styles from  './Login.module.css';

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
        if(!username || !password){
            setError("Username and password are required");
            return;
        }
        setError("");

        localStorage.setItem("username",username);
        alert(`Welcome, ${username}`);
    };

    const handleLogout = () =>{
        localStorage.removeItem("username");
        setUserName("");
        setPassword("");
    }

    return(
        <div className = {styles.loginContainer}>
            <div className = {styles.loginBox}>
                <h1 className = {styles.loginTitle}>User Login</h1>
                {error && <p>{error}</p>}
                <input type="text" placeholder="Username" value={username} onchange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onchange={(e) => setPassword(e.target.value)}/>
                <button onclick ={handleLogin}>Login</button>
                <button onclick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Login;