import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
        return request;
      } catch (error) {
        console.error(`Error fetching row ${title}:`, error);
      }
    }
    fetchData();
  }, [fetchUrl, title]);

  const handleClick = (movie) => {
    navigate('/watch', { state: { movie } });
  };

  const addToList = async (e, movie) => {
    e.stopPropagation();
    if (!auth.currentUser || !movie) return;
    try {
      await axios.post('/api/watchlist/add', {
        userId: auth.currentUser.uid,
        movie: {
          id: movie.id,
          title: movie.title,
          name: movie.name,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path
        }
      });
      alert('Added to My List!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Movie is already in your list.');
      } else {
        alert('Failed to add to My List.');
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div key={movie.id} className={`row__posterContainer ${isLargeRow ? "row__posterLargeContainer" : ""}`} onClick={() => handleClick(movie)}>
                <img
                  className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name || movie.title}
                />
                <button className="row__addBtn" onClick={(e) => addToList(e, movie)}>
                  +
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
