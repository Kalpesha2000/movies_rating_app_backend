const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config();

// Middleware to authenticate JWT token
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user; // Attach user object to request for further use
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = authMiddleware;
