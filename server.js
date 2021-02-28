// dependencies
const express = require('express');
const path = require('path');

// data
const noteData = require('./db/db');

// configuration
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files
app.use(express.static('public'));

// router
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(noteData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// listener
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
