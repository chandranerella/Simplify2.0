const express = require('express');
const PersonalInfo = require('../models/PersonalInfo');

const router = express.Router();

router.post('/personalInfo', async (req, res) => {
  try {
    // Session must exist
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { name, location, birthday, ethnicity, gender } = req.body;

    const info = new PersonalInfo({
      userEmail: req.session.user.email,
      name,
      location,
      birthday,
      ethnicity,
      gender
    });

    await info.save();
    res.json({ message: 'Personal info saved successfully', data: info });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save personal info' });
  }
});

module.exports = router;
