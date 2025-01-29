require('dotenv').config();

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');  // Main routes
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const rsvpRoutes = require('./controllers/api/rsvpRoutes');  // ✅ Ensure RSVP routes are imported correctly

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Set up Handlebars with helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ✅ Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'supersecret', // Default fallback
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    maxAge: 3600000, 
    httpOnly: true,  
    secure: false,   
    sameSite: 'strict',
  },
};

app.use(session(sessionConfig));

// ✅ Middleware to pass session data to views
app.use((req, res, next) => {
  res.locals.session = req.session; 
  next();
});

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Register RSVP routes correctly
app.use('/api/rsvps', rsvpRoutes); // 🔥 Fix: This now ensures RSVP routes are at `/api/rsvps`

// ✅ Register main routes
app.use(routes);

// ✅ Log to verify routes are loaded
console.log('✅ Routes successfully loaded:', routes);
console.log('✅ RSVP Routes successfully loaded:', rsvpRoutes);

// ✅ Sync Sequelize and Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
