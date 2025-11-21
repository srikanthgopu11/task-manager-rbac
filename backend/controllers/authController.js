// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    db.run(query, [username, hashedPassword, role || 'user'], function(err) {
        if (err) return res.status(400).json({ message: "User already exists" });
        res.status(201).json({ message: "User registered" });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    });
};