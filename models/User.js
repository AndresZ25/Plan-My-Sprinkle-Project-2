const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

module.exports = User;
