const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const dbPromise = open({
  filename: './guests.db',
  driver: sqlite3.Database
});


async function getAllGuests() {
  const db = await dbPromise;
  return await db.all('SELECT * FROM guests');
}

async function addGuest(guest) {
  const { name, email, phone_number, rsvp_status, gift } = guest;
  const db = await dbPromise;
  await db.run(
    'INSERT INTO guests (name, email, phone_number, rsvp_status, gift) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone_number, rsvp_status, gift]
  );
}


async function updateRSVPStatus(id, rsvp_status) {
  const db = await dbPromise;
  await db.run('UPDATE guests SET rsvp_status = ? WHERE id = ?', [rsvp_status, id]);
}


async function deleteGuest(id) {
  const db = await dbPromise;
  await db.run('DELETE FROM guests WHERE id = ?', [id]);
}

module.exports = {
  getAllGuests,
  addGuest,
  updateRSVPStatus,
  deleteGuest
};
