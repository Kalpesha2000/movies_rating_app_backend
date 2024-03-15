const Movie = require('../models/movieModel');

// Function to add a review and rating for a movie
exports.addReview = async (movieId, userId, rating, reviewText) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        // Check if user has already reviewed this movie
        const existingReview = movie.reviews.find(review => review.userId === userId);
        if (existingReview) {
            throw new Error('You have already reviewed this movie');
        }

        // Add new review
        movie.reviews.push({ userId, rating, reviewText });
        await movie.save();

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to update a review and rating for a movie
exports.updateReview = async (movieId, reviewId, userId, rating, reviewText) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        // Find the review to update
        const review = movie.reviews.find(review => review._id == reviewId && review.userId === userId);
        if (!review) {
            throw new Error('Review not found');
        }

        // Update review details
        review.rating = rating;
        review.reviewText = reviewText;

        await movie.save();

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to delete a review for a movie
exports.deleteReview = async (movieId, reviewId, userId) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        // Find the review to delete
        const index = movie.reviews.findIndex(review => review._id == reviewId && review.userId === userId);
        if (index === -1) {
            throw new Error('Review not found');
        }

        // Remove review from array
        movie.reviews.splice(index, 1);
        await movie.save();

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to list all reviews for a movie
exports.listReviews = async (movieId) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        return movie.reviews;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to calculate and return the average rating for a movie
exports.calculateAverageRating = async (movieId) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        if (movie.reviews.length === 0) {
            return 0;
        }

        const totalRating = movie.reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / movie.reviews.length;

        return averageRating;
    } catch (error) {
        throw new Error(error.message);
    }
};
