const session = require("express-session");

const sessionObject = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, sameSite: false, httpOnly: true },
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV === 'development') {
  sessionObject.store = new session.MemoryStore(); // only for development
}

const sessionMiddleware = session(sessionObject);

module.exports = sessionMiddleware;
