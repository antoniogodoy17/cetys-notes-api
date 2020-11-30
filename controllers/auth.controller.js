const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).send({ message: 'This email address is already in use. Please use another one.', statusCode: 400, data: {} });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashedPassword });
        
        await user.save();
        return res.status(201).send({ message: 'User created successfully.', statusCode: 201, data: { uid: user._id }});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: {} });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'Incorrect email or password.', statusCode: 404, data: {} });
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(400).send({ message: 'Incorrect email or password.', statusCode: 400, data: { } });
        }

        const token = await createToken(user._id, email);

        return res.status(200).send({ message: 'Logged in successfully.', statusCode: 200, data: { token } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: {} });
    }
};

const createToken = async (uid, email) => {
    const expiresIn = 60*60; // 1 hour
    const data = { uid, email };
    const token = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn });

    return token;
};