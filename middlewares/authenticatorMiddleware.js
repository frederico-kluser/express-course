const { errorBuilder } = require("../helpers/error");

const authentificate = (req, res, next) => {
  if (!req.session.authenticated) {
    return next(errorBuilder("You are not authenticated", 401));
  }
  
  next();
}

module.exports = authentificate;