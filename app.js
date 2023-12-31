const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
require('dotenv').config();
const pageRouter = require('./routes/pageRoute');

//DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`✔️  MongoDB connection is successful`))
  .catch((err) => console.log(`❌ MongoDB connection is failed\n${err}`));

//APP
const app = express();

//Configration
app.set('view engine', 'ejs');

//GLOBAL VARIABLES
global.userIN = null;

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

//ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.user;
  next();
});
app.use('/', pageRouter);

//LISTEN
const port = process.env.PORT ?? 5000;
app.listen(port, () => console.log(`🚀 The server running at port ${port}`));
