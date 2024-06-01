'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.get('/data', (req, res) => {
  res.status(200).json({ name: 'sample data' });
});

app.get('/data/:id', (req, res) => {
  const { id } = req.params;
  if (id === 'abc111') {
    res.status(200).json({ name: 'record abc111' });
  } else {
    res.status(404).json({ error: 'Record Not Found' });
  }
});

app.get('/person', (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).json({ error: 'Name query parameter is required' });
  } else {
    res.status(200).json({ name });
  }
});

// Define a 404 route for invalid paths
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

const start = (port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

module.exports = { app, start };
