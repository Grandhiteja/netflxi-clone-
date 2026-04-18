const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');

// Get a user's watchlist
router.get('/:userId', async (req, res) => {
  try {
    const list = await Watchlist.findAll({ where: { userId: req.params.userId } });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add movie to watchlist
router.post('/add', async (req, res) => {
  try {
    const { userId, movie } = req.body;
    
    // Check if already exists
    const existing = await Watchlist.findOne({ where: { userId, movieId: movie.id } });
    if (existing) {
      return res.status(400).json({ error: 'Movie already in watchlist' });
    }

    const newItem = await Watchlist.create({
      userId,
      movieId: movie.id,
      title: movie.title,
      name: movie.name,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove movie from watchlist
router.delete('/remove/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    await Watchlist.destroy({ where: { userId, movieId: Number(movieId) } });
    res.json({ message: 'Movie removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
