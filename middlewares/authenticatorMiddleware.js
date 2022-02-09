const authentificate = (req, res, next) => {
  if (!req.session.authenticated) {
    const err = new Error("You are not authenticated");
    err.status = 401;
    return next(err);
  }
  
  next();
}

module.exports = authentificate;