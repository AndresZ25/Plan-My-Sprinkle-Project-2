const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');

// Event Routes
router.get('/events', rsvpController.getEvents);

// RSVP Routes
router.post('/rsvp', rsvpController.createRSVP);
router.get('/rsvp/:eventId', rsvpController.getRSVPList);
router.delete('/rsvp/:eventId/:guestEmail', rsvpController.cancelRSVP);
router.get('/rsvp/guest/:guestEmail', rsvpController.getGuestRSVP);

module.exports = router;

