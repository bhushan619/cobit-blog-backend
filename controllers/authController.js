const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Registering user:', username); // Debug log

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const userId = await User.create(username, password);
        const token = generateToken(userId);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error); // Debug log
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user.id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};