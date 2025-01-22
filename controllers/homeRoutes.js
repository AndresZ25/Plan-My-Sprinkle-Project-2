const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

module.exports = router;