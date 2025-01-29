DROP DATABASE IF EXISTS rsvps;
CREATE DATABASE rsvps;
INSERT INTO rsvps (event_id, guest_name, guest_email, attending) VALUES ($1, $2, $3, $4)
