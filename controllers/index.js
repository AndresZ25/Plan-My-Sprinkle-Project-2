const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./user.routes');
const api = require("./api")


router.use('/', homeRoutes);
router.use('/user', userRoutes);

router.use("/api", api)

module.exports = router;
