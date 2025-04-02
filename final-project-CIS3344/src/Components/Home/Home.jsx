import styles from './Home.module.css';
import MovieSearch from '../MovieSearch';
import Navbar from '../Navbar/navBar';


const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.content}>
        <h2>Welcome to the Movie App</h2>
        <p>Explore and review your favorite movies!</p>

        <MovieSearch />
      </main>

      <footer className={styles.footer}>
        <p>Temple CIS 3344 Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
