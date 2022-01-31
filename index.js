require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const sessionMiddleware = require('./config/sessionConfig');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
console.log(DB);
mongoose.connect(DB, { 
  useNewUrlParser: true,
}).then(({ connections }) => {
  console.log(connections);
  console.log("Connected to MongoDB");
});

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json()); // app.use(express.json()); if dont wanna body-parser option
app.use(sessionMiddleware);

app.use('/id', require('./routes/id'));
app.use('/session', require('./routes/session'));
app.use('/login', require('./routes/login'));
app.use('/template', require('./routes/template'));
app.use('/user', require('./routes/userRouter'));

app.get('/render', (req, res, next) => {
  res.sendFile(__dirname + '/private/index.html');
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler()); // only for development
}

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
