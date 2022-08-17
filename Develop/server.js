// Require express, fs, path, and util packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require ('util');

// Require the `db.json` file and store it in `notes`
const dbFile = require('./db/db.json');
const uuid = require('./helpers/uuid.js');

// Use express to initialize the `app` server
const app = express();

const PORT = 3001;

// Have the `app` use the appropriate middleware to parse body data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// GET /notes shoudl return the notes.html file.

// GET * should return the index.html file.

// GET /api/notes should read the db.json file
	
	// res.json()

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
	
	// json.strigify data
	
	// fs.writeFile

// Use the `app` to `listen` to a specific port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
