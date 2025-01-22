const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Ensure this is correctly exported
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js with custom helpers
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
console.log('Routes:', routes); // Debug log
app.use(routes);

// Connect to database and start server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
