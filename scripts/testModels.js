require('dotenv').config();
const sequelize = require('../config/connection');
const User = require('../models/User');
const Guest = require('../models/Guest');

const testModels = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create a test user
    const testUser = await User.create({
      username: 'TestUser',
      password: 'password123',
    });
    console.log('User created:', testUser.toJSON());

    // Create a test guest
    const testGuest = await Guest.create({
      name: 'Jane Doe',
      rsvp_status: true,
    });
    console.log('Guest created:', testGuest.toJSON());

    await sequelize.close();
  } catch (err) {
    console.error('Error testing models:', err);
  }
};

testModels();
