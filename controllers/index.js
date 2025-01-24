const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const api = require("./api")
// Define route for the homepage
router.use('/', homeRoutes);
router.use("/api", api)
// Export the router
module.exports = router;
