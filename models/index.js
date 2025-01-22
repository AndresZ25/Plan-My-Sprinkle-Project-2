const sequelize = require('../config/connection');
const User = require('./User');

const db = {
  sequelize,
  User,
};

module.exports = db;
