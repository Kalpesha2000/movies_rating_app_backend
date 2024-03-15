const Movie = require('../models/movieModel');

// Rate and review a movie
exports.rateAndReviewMovie = async (req, res) => {
    const { rating, review } = req.body;
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is stored in req.user.id after authentication

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if user has already reviewed this movie
        const existingReview = movie.ratings.find(r => r.userId === userId);
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this movie' });
        }

        // Add new review
        movie.ratings.push({ userId, rating, review });
        await movie.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { movieId, reviewId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user.id after authentication

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Find the review to update
        const existingReview = movie.ratings.find(r => r._id == reviewId && r.userId === userId);
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update review details
        existingReview.rating = rating;
        existingReview.review = review;

        await movie.save();

        res.json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { movieId, reviewId } = req.params;
    const userId = req.user.id; // Assuming user ID is stored in req.user.id after authentication

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Find the review to delete
        const reviewIndex = movie.ratings.findIndex(r => r._id == reviewId && r.userId === userId);
        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Remove review from array
        movie.ratings.splice(reviewIndex, 1);
        await movie.save();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// List all reviews for a movie
exports.listReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(movie.ratings);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Calculate average rating for a movie
exports.calculateAverageRating = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (movie.ratings.length === 0) {
            return res.json({ averageRating: 0 });
        }

        const totalRating = movie.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRating / movie.ratings.length;

        res.json({ averageRating });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
