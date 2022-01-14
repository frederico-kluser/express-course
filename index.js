require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const sessionMiddleware = require('./config/sessionConfig');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(sessionMiddleware);

app.use('/id', require('./routes/id'));
app.use('/session', require('./routes/session'));

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler()); // only for development
}

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});