import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <h1>Movie App</h1>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
