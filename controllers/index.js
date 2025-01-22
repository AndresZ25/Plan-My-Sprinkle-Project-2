const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

// Define route for the homepage
router.use('/', homeRoutes);

// Export the router
module.exports = router;
