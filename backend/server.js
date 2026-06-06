require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
  res.send('StreamFlix Backend Running');
});

// Connect to DB
connectDB();

// API Routes
const moviesRoute = require('./routes/movies');
const watchlistRoute = require('./routes/watchlist');

app.use('/api/movies', moviesRoute);
app.use('/api/watchlist', watchlistRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
