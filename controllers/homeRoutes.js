const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Guest = require('../models/guest'); 


const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    return res.redirect('/login');  
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
  res.render('login'); 

});


router.get('/admin', isAuthenticated, async (req, res) => {
  try {
    
    const guestData = await Guest.findAll().catch((err) => {
      res.json(err);
    });

    const guests = guestData.map((guest) => guest.get({ plain: true }));
    
    res.render('admin', { guests });
  } catch (err) {
    res.status(500).json(err);
  }
});



// router.get('/admin', isAuthenticated, (req, res) => {
//   res.render('admin',{guests:[{name:"Andres"}]}); 

// });

module.exports = router;