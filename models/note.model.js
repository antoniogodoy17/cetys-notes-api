const mongoose = require('mongoose');

const noteModel = mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Note', noteModel);