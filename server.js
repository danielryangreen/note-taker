// dependencies
const express = require('express');
const path = require('path');

// configuration
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// listener
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
