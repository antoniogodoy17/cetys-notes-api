const Note = require('../models/note.model');

exports.getNotes = async (req, res, next) => {
    try {
        const user = req.user;
        const notes = await Note.find({ owner: user._id });

        return res.status(200).send({ message: 'Notes fetched successfully.', statusCode: 200, data: { notes } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: {} });
    }
};

exports.getNote = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const note = await Note.findOne({ _id: id, owner: user._id});

        if (!note) {
            return res.status(404).send({ message: 'Note not found.', statusCode: 404, data: { } });
        }

        return res.status(200).send({ message: 'Note found successfully.', statusCode: 200, data: { note } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: { } });
    }
};

exports.createNote = async (req, res, next) => {
    try {
        const user = req.user;
        const { title, description } = req.body;

        const note = new Note({ title, description, owner: user._id });

        const createdNote = await note.save();

        return res.status(201).send({ message: 'Note created successfully.', statusCode: 201, data: { note: createdNote } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: {} });
    }
};

exports.updateNote = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { title, description } = req.body;
    
        const foundNote = await Note.findOne({ _id: id, owner: user._id });
    
        if (!foundNote) {
            return res.status(404).send({ message: 'Note not found.', statusCode: 404, data: { } });
        }
    
        const note = await Note.findOneAndUpdate({ _id: id, owner: user._id }, { title, description }, { new: true });
    
        return res.status(200).send({ message: 'Note updated successfully.', statusCode: 200, data: { note } });
    } catch (error) {
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: { } });
    }
};

exports.deleteNote = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const foundNote = await Note.findOne({ _id: id, owner: user._id });
    
        if (!foundNote) {
            return res.status(404).send({ message: 'Note not found.', statusCode: 404, data: { } });
        }

        await Note.deleteOne({ _id: id, owner: user._id });

        return res.status(200).send({ message: 'Note deleted successfully.', statusCode: 200, data: { } });
    } catch(error) {
        return res.status(500).send({ message: 'Something went wrong.', statusCode: 500, data: { } });
    }
}