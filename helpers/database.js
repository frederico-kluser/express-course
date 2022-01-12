const getFiltredUser = ({ users }, propertyName, value) => (users.filter(item => item[propertyName] === value))[0] || null;

module.exports = {
  getFiltredUser,
};
