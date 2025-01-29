const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Make sure this path is correct

class RSVP extends Model {}

RSVP.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        guest_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guest_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Ensures valid email format
            },
        },
        attending: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'rsvp',
        timestamps: false, // Set to `true` if you want `createdAt` and `updatedAt` fields
        tableName: 'rsvps', // Ensure Sequelize uses the correct table name
    }
);

module.exports = RSVP;






// const express = require('express');
//const router = express.Router();
//const rsvpController = require('./api/rsvpController');

// Event Routes
//router.get('/events', rsvpController.getEvents);

// RSVP Routes
// router.post('/rsvp', rsvpController.createRSVP);
// router.get('/rsvp/:eventId', rsvpController.getRSVPList);
// router.delete('/rsvp/:eventId/:guestEmail', rsvpController.cancelRSVP);
// router.get('/rsvp/guest/:guestEmail', rsvpController.getGuestRSVP);

// module.exports = router;
