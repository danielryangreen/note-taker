// dependencies
const express = require('express');

// configuration
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.get('/', (req, res) => {
  res.send('test');
});

// listener
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
