const Movie = require('../models/movieModel');

// Function to add a new movie
exports.addMovie = async (title, director, genre, releaseYear, description) => {
    try {
        const movie = new Movie({
            title,
            director,
            genre,
            releaseYear,
            description
        });

        await movie.save();

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to update a movie
exports.updateMovie = async (movieId, updatedMovieData) => {
    try {
        const movie = await Movie.findByIdAndUpdate(movieId, updatedMovieData, { new: true });

        if (!movie) {
            throw new Error('Movie not found');
        }

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to delete a movie
exports.deleteMovie = async (movieId) => {
    try {
        const movie = await Movie.findByIdAndDelete(movieId);

        if (!movie) {
            throw new Error('Movie not found');
        }

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to get movie details
exports.getMovieDetails = async (movieId) => {
    try {
        const movie = await Movie.findById(movieId);

        if (!movie) {
            throw new Error('Movie not found');
        }

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to list all movies
exports.listMovies = async (filters) => {
    try {
        const movies = await Movie.find(filters);

        return movies;
    } catch (error) {
        throw new Error(error.message);
    }
};
