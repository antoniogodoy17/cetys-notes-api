const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const headers = req.headers;

        if (!headers.authorization) {
            return res.status(401).send({ message: 'User not authenticated.', statusCode: 401, data: {} });
        }

        const token = headers.authorization.split('Bearer ')[1];
        const validToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(validToken.uid);

        if (!user) {
            return res.status(404).send({ message: 'User not found.', statusCode: 404, data: {} });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'User not authenticated.', statusCode: 401, data: {} });
    }
};