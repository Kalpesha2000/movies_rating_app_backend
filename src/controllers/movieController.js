const Movie = require('../models/movieModel');

// Add a new movie
exports.addMovie = async (req, res) => {
    try {
        const { title, director, genre, releaseYear, description } = req.body;
        
        const newMovie = new Movie({
            title,
            director,
            genre,
            releaseYear,
            description
        });
        
        await newMovie.save();
        
        res.status(201).json(newMovie);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a movie
exports.updateMovie = async (req, res) => {
    try {
        const { title, director, genre, releaseYear, description } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie.title = title;
        movie.director = director;
        movie.genre = genre;
        movie.releaseYear = releaseYear;
        movie.description = description;

        await movie.save();

        res.json(movie);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        await movie.remove();

        res.json({ message: 'Movie removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get movie details
exports.getMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(movie);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// List all movies with optional filtering
exports.listMovies = async (req, res) => {
    try {
        let query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        if (req.query.releaseYear) {
            query.releaseYear = req.query.releaseYear;
        }

        if (req.query.director) {
            query.director = req.query.director;
        }

        const movies = await Movie.find(query);

        res.json(movies);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
