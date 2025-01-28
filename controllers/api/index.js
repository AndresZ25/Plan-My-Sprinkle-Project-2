const router = require('express').Router();
const guestroutes = require("./guestroutes");
router.use("/guest",guestroutes)


const rsvpRoutes = require('./rsvpRoutes');

router.use('/rsvp', rsvpRoutes);

module.exports = router;