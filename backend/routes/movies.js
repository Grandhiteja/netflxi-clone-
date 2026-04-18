const express = require('express');
const router = express.Router();
const { getMovies, getTrailer, searchMovies } = require('../controllers/movieController');

router.get('/search', searchMovies);
router.get('/', getMovies);
router.get('/:id/trailer', getTrailer);

module.exports = router;
