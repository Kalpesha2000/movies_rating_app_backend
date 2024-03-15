require("dotenv").config({ path: "src/.env" });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/movies', reviewRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Backend server is running Successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
