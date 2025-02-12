require('dotenv').config();

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); 
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const rsvpRoutes = require('./controllers/api/rsvpRoutes');  


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sessionConfig = {
  secret: process.env.SESSION_SECRET, 
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

app.use((req, res, next) => {
  res.locals.session = req.session; 
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/rsvps', rsvpRoutes); // 🔥 

//  main routes
app.use(routes);

console.log('✅ Routes successfully loaded:', routes);
console.log('✅ RSVP Routes successfully loaded:', rsvpRoutes);



sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
