import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import './MyList.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function MyList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (auth.currentUser) {
        try {
          const res = await axios.get(`/api/watchlist/${auth.currentUser.uid}`);
          setMovies(res.data.map(item => item.movie));
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
      } else {
        setMovies([]);
      }
    };

    // Watch for auth changes to load the list when user is ready
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchWatchlist();
      } else {
        setMovies([]);
      }
    });

    return unsubscribe;
  }, []);

  const handleClick = (movie) => {
    navigate('/watch', { state: { movie } });
  };

  const removeFromList = async (e, movieId) => {
    e.stopPropagation();
    if (!auth.currentUser) return;
    
    try {
      await axios.delete(`/api/watchlist/remove/${auth.currentUser.uid}/${movieId}`);
      setMovies(movies.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <div className="mylist">
      <Navbar />
      <div className="mylist__container">
        <h2>My List</h2>
        
        {movies.length > 0 ? (
          <div className="mylist__grid">
            {movies.map(movie => (
              <div key={movie.id} className="mylist__item" onClick={() => handleClick(movie)}>
                <img
                  className="mylist__poster"
                  src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="mylist__item__overlay">
                  <span className="mylist__item__title">{movie.title || movie.name}</span>
                  <button className="mylist__removeBtn" onClick={(e) => removeFromList(e, movie.id)}>✖</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mylist__empty">
            <h3>Your list is empty.</h3>
            <button onClick={() => navigate('/')}>Browse Movies</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyList;
