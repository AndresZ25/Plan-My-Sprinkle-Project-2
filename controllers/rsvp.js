const express = require('express');
const router = express.Router();
const rsvpController = require('./rsvpController');

router.get('/events', rsvpController.getEvents);

router.post('/rsvp', rsvpController.createRSVP);

router.get('/rsvp/:eventId', rsvpController.getRSVPList);

router.delete('/rsvp/:eventId/:guestEmail', rsvpController.cancelRSVP);

router.get('/rsvp/guest/:guestEmail', rsvpController.getGuestRSVP);

module.exports = router;
