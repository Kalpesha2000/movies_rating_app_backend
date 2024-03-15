// movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Add a new movie
router.post('/', movieController.addMovie);

// Update a movie
router.put('/:id', movieController.updateMovie);

// Delete a movie
router.delete('/:id', movieController.deleteMovie);

// Get movie details
router.get('/:id', movieController.getMovieDetails);

// List all movies
router.get('/', movieController.listMovies);

module.exports = router;
