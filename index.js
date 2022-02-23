require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json()); // app.use(express.json()); if dont wanna body-parser option
app.use(sessionMiddleware);

app.use('/session', require('./routes/session'));
app.use('/template', require('./routes/template'));
app.use('/user', require('./routes/userRouter'));
app.use('/chat', require('./routes/chatRouter'));
app.use('/login', require('./routes/loginRouter'));

app.get('/render', (req, res, next) => {
  res.sendFile(__dirname + '/private/index.html');
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler()); // only for development
}

module.exports = {
  app,
  PORT,
};
