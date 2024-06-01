// validator.test.js

const validator = require('./validator');

// Mock request and response objects
const reqWithoutName = { query: {} };
const reqWithName = { query: { name: 'John' } };
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
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
