const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./user.routes');
const apiRoutes = require('./api');
const rsvpRoutes = require('./rsvp');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/rsvp', rsvpRoutes);
router.use('/user', userRoutes);

module.exports = router;



