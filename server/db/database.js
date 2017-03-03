const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.mongoose.uri);
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('connection error:', err.message);
});
db.once('open', () => {
    console.log("Connected");
});