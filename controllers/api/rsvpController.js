const client = require('/Users/natgonza/Desktop/plan-my-sprinkle/Plan-My-Sprinkle-Project-2/config/connection.js');

exports.getEvents = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM events');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createRSVP = async (req, res) => {
    const { event_id, guest_name, guest_email } = req.body;

    if (!event_id || !guest_name || !guest_email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
       
        const checkRSVP = await client.query('SELECT * FROM rsvps WHERE event_id = $1 AND guest_email = $2', [event_id, guest_email]);
        if (checkRSVP.rowCount > 0) {
            return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
        }

        
        const result = await client.query('INSERT INTO rsvps (event_id, guest_name, guest_email) VALUES ($1, $2, $3) RETURNING *', [event_id, guest_name, guest_email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getRSVPList = async (req, res) => {
    const { eventId } = req.params;

    try {
        const result = await client.query('SELECT guest_name, guest_email FROM rsvps WHERE event_id = $1', [eventId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cancelRSVP = async (req, res) => {
    const { eventId, guestEmail } = req.params;

    try {
        const result = await client.query('DELETE FROM rsvps WHERE event_id = $1 AND guest_email = $2 RETURNING *', [eventId, guestEmail]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'RSVP not found' });
        }

        res.json({ message: 'RSVP canceled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getGuestRSVP = async (req, res) => {
    const { guestEmail } = req.params;

    try {
        const result = await client.query('SELECT * FROM events e JOIN rsvps r ON e.id = r.event_id WHERE r.guest_email = $1', [guestEmail]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};