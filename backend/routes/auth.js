const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // 4. Create session
    req.session.user = { name: newUser.name, email: newUser.email };

    // 5. Send success response
    res.json({ message: 'Signup successful', user: req.session.user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during signup' });
  } 
});

router.get('/test', (req, res) => {
  res.send('API is working!');
  console.log("✅ /api/test route was hit");
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 2. Compare the hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 3. Create a session for the user
    req.session.user = { name: user.name, email: user.email };

    // 4. Send success response
    res.json({ message: 'Login successful', user: req.session.user });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during login' });
  }
})

module.exports = router;

