
const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
