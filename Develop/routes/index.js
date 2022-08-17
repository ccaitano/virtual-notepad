const express = require('express');

// Import modular router for /notes
const notesRouter = require('./notesRouter');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
