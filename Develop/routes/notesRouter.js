const express = require('express');
const notesDb = require('../db/db.json');
const notesRouter = express.Router();

const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
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
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
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
  