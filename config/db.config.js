const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.covh7.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

exports.connect = (req, res, next) => {
    return mongoose.connect(MONGODB_URI, MONGO_OPTIONS);
};