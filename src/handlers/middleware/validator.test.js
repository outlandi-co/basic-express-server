// validator.test.js

const validator = require('./validator');

// Mock request and response objects
const reqWithoutName = { query: {} };
const reqWithName = { query: { name: 'John' } };
const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};

// Test cases
test('Validator middleware should return error if name parameter is missing', () => {
  validator(reqWithoutName, res, jest.fn());

  // Verify that the status is set to 400
  expect(res.status).toHaveBeenCalledWith(400);

  // Verify that the JSON response contains the error message
  expect(res.json).toHaveBeenCalledWith({ error: 'Name parameter is required' });
});

test('Validator middleware should pass if name parameter is present', () => {
  const next = jest.fn();
  validator(reqWithName, res, next);

  // Verify that next() is called to proceed to the next middleware
  expect(next).toHaveBeenCalled();
});
// Import required modules
const express = require('express');

// Create an instance of Express app
const app = express();

// Set up middleware to parse JSON bodies
app.use(express.json());

// Array to store items
let items = [];

// GET route to list items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST route to add an item
app.post('/items', (req, res) => {
  const newItem = req.body.name;
  if (!newItem) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  items.push(newItem);
  res.status(201).json({ message: 'Item added successfully', newItem });
});

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
