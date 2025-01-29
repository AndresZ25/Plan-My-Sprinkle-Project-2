# Project 2 - Baby Shower Guest Management System
# Baby Shower Guest Management System

## Introduction
The Baby Shower Guest Management System is a web-based application designed to help hosts manage guest lists, RSVPs, and event details efficiently. Built with Node.js, Express, and Sequelize, this system ensures seamless tracking of attendees.

## Features
- Create and manage baby shower events
- Allow guests to RSVP with their details
- View and manage the guest list
- Cancel RSVPs if plans change
- Search RSVPs by guest email

## Technologies Used
- **Node.js** - Backend server
- **Express.js** - Web framework
- **Sequelize** - ORM for database management
- **SQLite/PostgreSQL/MySQL** - Database support

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **NPM** (comes with Node.js)
- **Database** (SQLite, PostgreSQL, or MySQL)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/plan-my-sprinkle-project-2.git
   cd plan-my-sprinkle-project-2
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the database in `config/database.js`.
4. Run database migrations:
   ```sh
   npx sequelize db:migrate
   ```
5. Start the application:
   ```sh
   npm start
   ```
6. The API will be available at `http://localhost:3001`.

## How It Works
1. **Host Sets Up Event**: The host creates a baby shower event in the system.
2. **Guests RSVP**: Guests can RSVP by submitting their name and email.
3. **Manage Guest List**: The host can view, update, or remove guests from the list.
4. **RSVP Cancellation**: Guests can cancel their RSVP if unable to attend.

## Privacy & Security

PlanMySprinkle takes your privacy seriously. All data collected is securely stored and will only be used to improve overall guest experience with the app. 


## API Endpoints
### Event Management
- **GET /events** - Retrieve all baby shower event details.

### RSVP Management
- **POST /rsvp** - Submit an RSVP for an event.
- **GET /rsvp/:eventId** - View the guest list for an event.
- **DELETE /rsvp/:eventId/:guestEmail** - Cancel an RSVP.
- **GET /rsvp/guest/:guestEmail** - Retrieve all RSVPs for a guest.

## License
This project is open-source and available under the [MIT License](LICENSE).

