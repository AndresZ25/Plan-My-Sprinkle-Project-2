const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const rsvpRoutes = require('./rsvp');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/rsvp', rsvpRoutes);

module.exports = router;
