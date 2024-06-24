// src/index.js
const express = require('express');
const cors = require('cors');

const { handleNotFound, handleError } = require('./handlers/middleware/errorHandler');
const logger = require('./handlers/middleware/logger');
const timeStamp = require('./handlers/middleware/timestamp');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(timeStamp);

// Routes
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Error handling middleware
app.use(handleNotFound);
app.use(handleError);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
