const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(morgan('dev'));

app.use('/id', require('./routes/id'));
app.use('/login', require('./routes/login'));

app.use(errorhandler()); 

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});