const express = require('express');
const router = express.Router();
const rsvpController = require('./rsvpController');

// Event Routes
router.get('/events', rsvpController.getEvents);

// RSVP Routes
router.post('/rsvp', rsvpController.createRSVP);
router.get('/rsvp/:eventId', rsvpController.getRSVPList);
router.delete('/rsvp/:eventId/:guestEmail', rsvpController.cancelRSVP);
router.get('/rsvp/guest/:guestEmail', rsvpController.getGuestRSVP);


const { RSVP } = require('../../models'); // Assuming you have a Guest model
router.post('/', async (req, res) => {
  try {
    console.log(req.body); // Log the incoming data for debugging

    // Create a new guest record in the database
    const newRSVP = await RSVP.create(req.body);

    console.log('New RSVP:', newRSVP); // Log the new guest data

    // Redirect to confirmation page
    res.redirect('/rsvp/confirmation');
  } catch (err) {
    console.error('Error saving RSVP:', err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to submit RSVP.' });
  }
});


module.exports = router;

