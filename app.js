const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRouts')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleWare');

// dotenv
require('dotenv').config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/coffees', requireAuth,(req, res) => res.render('coffees'));
app.use(authRoutes);

