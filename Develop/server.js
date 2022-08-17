// Require express, fs, path, and util packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require ('util');
const api = require ('./routes/index.js');

// Require modular routes for notes
const routes = require('./routes');

// Require the `db.json` file and store it in `notes`
const dbFile = require('./db/db.json');
const uuid = require('./helpers/uuid');
const fsUtils = require('./helpers/fsUtils')

// Use express to initialize the `app` server
const app = express();

// Declare Port
const PORT = 3001;

// Have the `app` use the appropriate middleware to parse body data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for the homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET /notes shoudl return the notes.html file.
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET * should return the index.html file.
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET /api/notes should read the db.json file
	
	// res.json()

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
	
	// json.strigify data
	
	// fs.writeFile

// Use the `app` to `listen` to a specific port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
