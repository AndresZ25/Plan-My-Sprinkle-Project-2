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




router.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin'); 

});



module.exports = router;