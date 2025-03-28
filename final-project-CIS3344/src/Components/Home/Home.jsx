import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Movie App</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>

      <main className={styles.content}>
        <h2>Welcome to the Movie App</h2>
        <p>Explore and review your favorite movies!</p>
      </main>

      <footer className={styles.footer}>
        <p>Temple CIS 3344 Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
