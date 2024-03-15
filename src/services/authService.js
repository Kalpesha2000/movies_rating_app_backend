const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Function to register a new user
exports.registerUser = async (username, email, password) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to authenticate user and generate JWT token
exports.authenticateUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};
