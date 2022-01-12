const getUsers = (req, res, next) => {
  const fs = require('fs');
  const data = fs.readFileSync('./database.json', 'utf-8');

  const { users } = JSON.parse(data);
  req.users = users;

  next();
}

module.exports = {
  getUsers,
};
