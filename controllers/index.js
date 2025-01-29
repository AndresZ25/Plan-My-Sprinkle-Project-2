const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./user.routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', userRoutes);

module.exports = router;



