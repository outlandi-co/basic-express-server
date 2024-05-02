'use strict'; // Enabling strict mode

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const handleNotFound = require('./handlers/404.js'); // Adjusting the import path
const handleError = require('./handlers/500.js'); // Adjusting the import path
const validator = require('./middleware/validator.js'); // Adjusting the import path

const timeStamp = require('./middleware/timestamp.js'); // Adjusting the import path

const app = express();

const database = { // Using const for database since it's not reassigned
  abc111: { name: 'John' },
  def222: { name: 'Cathy' },
  ghi333: { name: 'Zachary' },
  jkl444: { name: 'Allie' },
};

app.use(cors()); // Allowing all origins for CORS

app.use(timeStamp); // Using timestamp middleware for all routes

// Route Handlers

function getData(req, res) {
  res.status(200).json(database);
}

function getHomePage(req, res) {
  res.status(200).send('Hello World');
}

function simulateError(req, res, next) {
  next('We have a problem');
}

// Route Definitions

app.get('/', getHomePage);
app.get('/data', getData);
app.get('/data/:id', validator, (req, res, next) => { // Using arrow function syntax for route handler
  const id = req.params.id;
  if (database[id]) {
    res.status(200).json(database[id]);
  } else {
    next('Record Not Found');
  }
});
app.get('/broken', simulateError);

// Error Handlers
app.use('*', handleNotFound); // Handling 404 errors for all routes
app.use(handleError); // Handling other errors

function start(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = { app, start };
