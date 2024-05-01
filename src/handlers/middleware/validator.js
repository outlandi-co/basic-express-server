// validator.js

function validator(req, res, next) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name parameter is required' });
  }

  // If name parameter exists, continue to the next middleware
  next();
}

module.exports = validator;
