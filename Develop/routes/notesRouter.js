const notesRouter = require('express').Router();
const notesDb = require('../db/db.json');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('../helpers/uuid');

// GET Route for retrieving the notes

notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
    readFromFile(notesDb).then((data) => res.json(JSON.parse(data)));
  });
  
// POST Route for submitting new notes
notesRouter.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit notes`);
  
    // Destructuring assignment for the items in req.body
    const { title, text, note_id } = req.body;
  
    // If all the required properties are present
    if (title && text && note_id) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, notesDb);
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in saving new note');
    }
  });

  module.exports = notesRouter
  