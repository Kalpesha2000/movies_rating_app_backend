// reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Rate and review a movie
router.post('/:id/reviews', reviewController.rateAndReviewMovie);

// Update a review
router.put('/:movieId/reviews/:reviewId', reviewController.updateReview);

// Delete a review
router.delete('/:movieId/reviews/:reviewId', reviewController.deleteReview);

// List all reviews for a movie
router.get('/:id/reviews', reviewController.listReviews);

// Calculate average rating for a movie
router.get('/:id/averageRating', reviewController.calculateAverageRating);

module.exports = router;
