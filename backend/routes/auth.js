const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1d' });
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Setup Initial Admin (Run once)
router.post('/setup', async (req, res) => {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      isAdmin: true
    });
    await admin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
