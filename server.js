// DEPENDENCIES
const express = require('express');
const path = require('path');

// require UUID package
const { v4: uuidv4 } = require('uuid');

// DATA
const noteData = require('./db/db');

// CONFIGURATION
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files
app.use(express.static('public'));

// ROUTER
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(noteData);
});

// this wildcard route needs to be last in the list of get routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  const id = uuidv4();
  const newNote = {id: id, title: title, text: text};
  console.log(newNote);
  noteData.push(newNote);
  res.json(noteData);
});

// LISTENER
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
