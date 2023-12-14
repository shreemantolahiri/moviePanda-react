import { useState, useEffect } from "react";
//f7bf8e5
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=f7bf8e5";

//demo object
// const movie1 = {
//   Title: "The Matrix",
//   Year: "1999",
//   imdbID: "tt0133093",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
// };

const App = () => {
  //setting a state
  const [movies, setMovies] = useState([]);

  //multiple states per component are allowed
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Matrix");
  }, []);

  return (
    <div className="app">
      <h1>MoviePanda</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
        }}
        />
        <img src={SearchIcon} alt="search-icon" onClick={() => { searchMovies(searchTerm)}} />
      </div>
        {/* {To handle null reference if value of movies is null. Or undefined.} */}
      {movies?.length > 0 ? (
        <div className="container">
          {/* using map function */}
          {movies.map(
            (movie) => (<MovieCard movie1={movie} />)
          )}
          <MovieCard movie1={movies[0]} />
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
