const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.tmdb.org/3';

const requests = {
  streamflixOriginals: `/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`,
  trending: `/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
  action: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`,
  comedy: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`,
  horror: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`,
  romance: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749`,
  documentary: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99`,
  sciFi: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878`,
  animation: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16`,
  mystery: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=9648`,
  family: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10751`,
  crime: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=80`
};

const getMovies = async (req, res) => {
  const category = req.query.category || 'trending';
  
  let fetchUrl = requests.trending;
  if(category === 'streamflixOriginals') fetchUrl = requests.streamflixOriginals;
  if(category === 'top-rated') fetchUrl = requests.topRated;
  if(category === 'action') fetchUrl = requests.action;
  if(category === 'comedy') fetchUrl = requests.comedy;
  if(category === 'horror') fetchUrl = requests.horror;
  if(category === 'romance') fetchUrl = requests.romance;
  if(category === 'documentary') fetchUrl = requests.documentary;
  if(category === 'scifi') fetchUrl = requests.sciFi;
  if(category === 'animation') fetchUrl = requests.animation;
  if(category === 'mystery') fetchUrl = requests.mystery;
  if(category === 'family') fetchUrl = requests.family;
  if(category === 'crime') fetchUrl = requests.crime;

  try {
    const response = await axios.get(`${TMDB_BASE_URL}${fetchUrl}`);
    res.json({ results: response.data.results });
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch movies from TMDB" });
  }
};

const getTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    let response;
    try {
      response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        response = await axios.get(`${TMDB_BASE_URL}/tv/${id}/videos?api_key=${TMDB_API_KEY}`);
      } else {
        throw err;
      }
    }

    if (!response || !response.data || !response.data.results) {
      return res.status(404).json({ error: "No trailer found" });
    }

    const videos = response.data.results;
    let trailer = videos.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer');
    
    if (!trailer) {
      trailer = videos.find(vid => vid.site === 'YouTube');
    }

    if (trailer) {
      res.json({ trailerUrl: trailer.key });
    } else {
      res.status(404).json({ error: "No YouTube trailer found" });
    }
  } catch (error) {
    console.error("Trailer fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch trailer" });
  }
};

const searchMovies = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    res.json({ results: response.data.results });
  } catch (error) {
    console.error("Search API Error:", error.message);
    res.status(500).json({ error: "Failed to search movies from TMDB" });
  }
};

module.exports = { getMovies, getTrailer, searchMovies };
