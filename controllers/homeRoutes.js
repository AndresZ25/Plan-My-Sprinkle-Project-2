const express = require('express');
const router = express.Router();
const User = require('../models/User');


const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Please log in to access this page' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};



router.get('/', (req, res) => {
  res.render('homepage');
});


router.get('/login', (req, res) => {
  res.render(''); 

});






//login 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;
      res.json({ message: 'Login successful' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
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


router.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin'); 

});



module.exports = router;