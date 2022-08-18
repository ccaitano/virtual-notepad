// Require express, fs, path, and util packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require ('util');
const { v4: uuidv4 } = require('uuid');

// Use express to initialize the `app` server
const app = express();

// Declare port
const PORT = process.env.PORT || 3001;

// Declare global variables
let savedNotes = [];

// Have the `app` use the appropriate middleware to parse body data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// GET Route for the homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET /api/notes should read the db.json file
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);
    savedNotes = fs.readFileSync("./db/db.json", "utf-8");
    savedNotes = JSON.parse(savedNotes);
    res.json(savedNotes);
});	

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to submit notes`);
    savedNotes = fs.readFileSync("./db/db.json", "utf-8");
    savedNotes = JSON.parse(savedNotes);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };

      savedNotes.push(newNote);
      savedNotes = JSON.stringify(savedNotes);      
      fs.writeFile('./db/db.json', savedNotes, (err) =>
        err
            ? console.error(err)
            : console.log(`Note Submitted`)
        );
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in saving new note');
    }
  });

// DELETE selected notes
app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete note`);
    savedNotes = fs.readFileSync("./db/db.json", "utf-8");
    savedNotes = JSON.parse(savedNotes);
    for(let i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id == req.params.id) {
            console.log('Note Removed');
            savedNotes.splice(i, 1);
        }    
    }
    console.log(savedNotes);
    savedNotes = JSON.stringify(savedNotes);
    fs.writeFile("./db/db.json", savedNotes, "utf-8", (err) =>
    err
        ? console.error(err)
        : console.log(`Note Deleted`)
    );
    res.json(savedNotes);
});

// GET * should return the index.html file for any wildcard paths
app.get('/*', (req, res) =>
    res.status(404).sendFile(path.join(__dirname, '/public/index.html'))
);

// Use the `app` to `listen` to a specific port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
