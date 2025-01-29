const express = require('express');
const router = express.Router();
const { Event, RSVP } = require('../models'); 

router.post('/', async (req, res) => {
    try {
        const { name, description, date } = req.body;
        const newEvent = await Event.create({ name, description, date });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, date } = req.body;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        await event.update({ name, description, date });
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        await event.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});


router.post('/:id/rsvp', async (req, res) => {
    try {
        const { id } = req.params;
        const { guestName, guestEmail } = req.body;

        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newRSVP = await RSVP.create({ eventId: id, guestName, guestEmail });
        res.status(201).json(newRSVP);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to RSVP' });
    }
});

module.exports = router;


// app.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const eventRoutes = require('./routes/events');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/events', eventRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync();

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();
