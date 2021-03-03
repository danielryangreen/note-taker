// DEPENDENCIES
const express = require('express');
const path = require('path');
const fs = require('fs');

// require UUID package
const { v4: uuidv4 } = require('uuid');

// DATA
const noteData = require('./db/db.json');

// CONFIGURATION
const app = express();

// set port for Heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

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
  fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) =>
    err ? console.log(err) : console.log('Success!')
  );
  res.json(noteData);
});

// LISTENER
app.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});
