import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import Navbar from '../components/Navbar';
import './Search.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery().get("q");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/movies/search?q=${encodeURIComponent(query)}`);
        // Filter out results without images to maintain UI consistency
        const validMovies = res.data.results.filter(movie => movie.backdrop_path || movie.poster_path);
        setMovies(validMovies);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleClick = (movie) => {
    navigate('/watch', { state: { movie } });
  };

  return (
    <div className="search">
      <Navbar />
      <div className="search__container">
        <h2>Search Results for "{query}"</h2>
        
        {loading ? (
          <div className="search__loading">Loading...</div>
        ) : movies.length > 0 ? (
          <div className="search__grid">
            {movies.map(movie => (
              <div key={movie.id} className="search__item" onClick={() => handleClick(movie)}>
                <img
                  className="search__poster"
                  src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="search__item__overlay">
                  <span className="search__item__title">{movie.title || movie.name || movie.original_name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="search__empty">
            <h3>No results found for "{query}".</h3>
            <p>Try searching for another movie, TV show, or actor.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
