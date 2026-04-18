import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { auth } from "../firebase";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get("/api/movies?category=trending");
        if (request?.data?.results?.length > 0) {
          setMovie(
            request.data.results[
              Math.floor(Math.random() * request.data.results.length)
            ]
          );
        }
        return request;
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={() => navigate('/watch', { state: { movie } })}>Play</button>
          <button className="banner__button" onClick={async () => {
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
          }}>My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.description, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
