// validator.js
function validator(req, res, next) {
    const { name } = req.query;
    if (!name) {
        res.status(500).send('Error: Name is required in the query string.');
    } else {
        next();
    }
}

module.exports = validator;
