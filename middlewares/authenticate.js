const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = user;
            next();
        } else {
            return res.status(400).json({ message: 'Authorization required' });
        }
    }
};

module.exports = { authenticate };