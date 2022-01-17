const { errorBuilder } = require('./error');

const _getUsersData = () => {
  const fs = require('fs');
  const data = fs.readFileSync('./database.json', 'utf-8');

  const { users } = JSON.parse(data);
  return users;
};

const getUser = (username, password) => {
  const users = _getUsersData();
  const userObj = users.filter(item => item.username === username)[0] || null;

  const result = {
    error: true,
    content: null,
  }
  
  if (!userObj) {
    result.content = errorBuilder('User not found', 404);
  } else if (userObj.password !== password) {
    result.content = errorBuilder('Wrong password', 401);
  } else {
    result.error = false;
    result.content = userObj;
  }


  return result;
}

const getId = (id) => _getUsersData().filter(item => item.id === id)[0] || null;

module.exports = {
  getUser,
  getId,
};
