const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/users.route');
const EventsRoutes = require('./routes/events.route');

const app = express();

const MONGO_URL = 'mongodb+srv://openxcell:openxcell123@cluster0.j1umq.mongodb.net/openxcell_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,  
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.log('Connection failed', error);
});

// Body Parser middleware to handle POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Cross Origin Resource Sharing (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// API Routes
app.use('/api/users', UserRoutes);
app.use('/api/events', EventsRoutes);

module.exports = app;