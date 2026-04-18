import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import axios from '../axios';
import './Watch.css';

function Watch() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {};
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    if (movie && movie.id) {
      fetchTrailer(movie.id);
    }
  }, [movie]);

  const fetchTrailer = async (id) => {
    try {
      const response = await axios.get(`/api/movies/${id}/trailer`);
      setTrailerUrl(response.data.trailerUrl);
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="watch">
      <div className="watch__back" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Back to Home
      </div>
      
      {movie ? (
        <div className="watch__container">
          <h2>Watching: {movie.title || movie.name}</h2>
          <div className="watch__player">
            {trailerUrl ? (
              <YouTube key={trailerUrl} videoId={trailerUrl} opts={opts} />
            ) : (
              <div className="watch__loading">Loading trailer...</div>
            )}
          </div>
          <p className="watch__description">{movie.description || movie.overview}</p>
        </div>
      ) : (
        <div className="watch__error">
          <h2>Movie not found. Please select a valid movie to watch.</h2>
        </div>
      )}
    </div>
  );
}

export default Watch;
