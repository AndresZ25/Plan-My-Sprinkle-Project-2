const client = require('../../config/connection');
// ('/Users/natgonza/Desktop/plan-my-sprinkle/Plan-My-Sprinkle-Project-2/config/connection.js');


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
    let { event_id, guest_name, guest_email, attending } = req.body;

    // Convert event_id to an integer
    event_id = parseInt(event_id, 10);

    // Log the processed data for debugging
    console.log('Processed RSVP Data:', { event_id, guest_name, guest_email, attending });

    // Validate that 'attending' is a boolean
    if (typeof attending !== 'boolean') {
        console.error('Error: Attending must be a boolean value.');
        return res.status(400).json({ message: 'Invalid value for attending. Must be true or false.' });
    }

    // Validate other required fields
    if (!event_id || !guest_name || !guest_email) {
        console.error('Error: Missing required fields', { event_id, guest_name, guest_email });
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        console.log('Checking if RSVP already exists...');
        const checkRSVP = await client.query(
            'SELECT * FROM rsvps WHERE event_id = $1 AND guest_email = $2',
            [event_id, guest_email]
        );

        console.log('RSVP check result:', checkRSVP.rows);

        if (checkRSVP.rowCount > 0) {
            console.warn('User has already RSVP\'d:', { event_id, guest_email });
            return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
        }

        console.log('Inserting RSVP into database...');
        const result = await client.query(
            'INSERT INTO rsvps (event_id, guest_name, guest_email, attending) VALUES ($1, $2, $3, $4) RETURNING *',
            [event_id, guest_name, guest_email, attending]
        );
        console.log('RSVP created successfully:', result.rows[0]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error during RSVP creation:', err.message, err.stack);
        res.status(500).json({ error: 'Failed to submit RSVP.' });
    }
};








//exports.createRSVP = async (req, res) => {
   // const { event_id, guest_name, guest_email, attending } = req.body;

    // Log the values to check the data coming from the frontend
    // console.log('Received RSVP data:', { event_id, guest_name, guest_email, attending });

    // if (!event_id || !guest_name || !guest_email || !attending) {
       // return res.status(400).json({ message: 'Missing required fields' });
    //}

    //try {
      //  const checkRSVP = await client.query('SELECT * FROM rsvp WHERE event_id = $1 AND guest_email = $2', [event_id, guest_email]);
        // if (checkRSVP.rowCount > 0) {
           // return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
        // }

       // const result = await client.query(
         //   'INSERT INTO rsvp (event_id, guest_name, guest_email, attending) VALUES ($1, $2, $3, $4) RETURNING *', 
           // [event_id, guest_name, guest_email, attending]
        // );

        // console.log('RSVP inserted:', result.rows[0]); // Log inserted data

        // res.status(201).json(result.rows[0]);
    // } catch (err) {
       // console.error('Error occurred during RSVP submission:', err.message); // More detailed error logging
        //res.status(500).json({ message: 'Server error', error: err.message });
    //}
// };




 // exports.createRSVP = async (req, res) => {
    // const { event_id, guest_name, guest_email } = req.body;

     // if (!event_id || !guest_name || !guest_email) {
        // return res.status(400).json({ message: 'Missing required fields' });
     //}

     // try {
       
        // const checkRSVP = await client.query('SELECT * FROM rsvps WHERE event_id = $1 AND guest_email = $2', [event_id, guest_email]);
         // if (checkRSVP.rowCount > 0) {
            // return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
         //}

        
       //  const result = await client.query('INSERT INTO rsvps (event_id, guest_name, guest_email) VALUES ($1, $2, $3) RETURNING *', [event_id, guest_name, guest_email]);
        // res.status(201).json(result.rows[0]);
     // } catch (err) {
        // console.error(err);
        // res.status(500).json({ message: 'Server error' });
     // }
 // };


 exports.getRSVPList = async (req, res) => {
    const { eventId } = req.params;

    console.log('Request Params:', { eventId });

    try {
        const result = await client.query('SELECT guest_name, guest_email FROM rsvps WHERE event_id = $1', [eventId]);
        console.log('Query Result:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching RSVP list:', err.message, err.stack);
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