const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.routes');
const noteRoutes = require('./routes/note.routes');

const { isAuthenticated } = require('./middlewares/auth.middleware');

!process.env.NODE_ENV ? dotenv.config() : 'production';

const db = require('./config/db.config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/notes', isAuthenticated, noteRoutes);

app.use('*', (req, res, next) => {
    return res.status(200).send({ message: 'Message updated.', statusCode: 200, data: { } });
});

db.connect().then(() => {
    console.log('Mongo connection initialized.');
    app.listen(process.env.SERVER_PORT || 3000, () => console.log(`Server listening on PORT ${process.env.SERVER_PORT}.`) );
}).catch();