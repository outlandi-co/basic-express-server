'use strict';

function handleNotFound(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}

function handleError(error, req, res, next) {
  const status = error.status || 500;
  const errorObject = {
    status: status,
    error: error.message,
    path: req.path,
  };

  res.status(status).json(errorObject);
}

module.exports = { handleNotFound, handleError };
