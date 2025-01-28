const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models'); 



router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', err });
  }
});




router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role; 
      res.redirect('/admin');
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', err });
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/');
  });
});

module.exports = router;