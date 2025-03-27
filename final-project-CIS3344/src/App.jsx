import './App.css'
import Profile from './Components/Profile/Profile';

function App() {
  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=7d11d871a2508f89d683e26fcc9d0336`)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  const goToProfile = () => {
    <Profile />
  }

  return (
    <>
      <h1>Movies</h1>
      <div className="card">
        <button onClick={fetchMovies}>
          Fetch me a movie
        </button>
      </div>
      <button onClick={goToProfile}>Profile</button>
    </>
  )
}

export default App
