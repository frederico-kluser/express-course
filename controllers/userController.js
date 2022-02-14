const User = require("../models/userModel");

const insertUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const userInstance = new User({
    name,
    email,
    password,
  });

  userInstance.save().then((message) => {
    res.status(201).json({
      status: "success",
      data: message,
    });
  }).catch((err) => {
    res.status(400).json({ status: "error", message: err });
  });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id).then((user) => {
    res.status(200).json({
      status: "success",
      data: user,
    });
  }).catch((err) => {
    res.status(400).json({ status: "error", message: err });
  });
};

const getAllUsers = (req, res, next) => {
  User.find({}).then((users) => {
    res.status(200).json({
      status: "success",
      data: users,
    });
  }).catch((err) => {
    res.status(400).json({ status: "error", message: err });
  });
};

const getAllUsersEmail = (req, res, next) => {
  User.find(
    {},
    { 
      email: 1,
    }
  ).then((users) => {
    res.status(200).json({
      status: "success",
      data: users,
    });
  }).catch((err) => {
    res.status(400).json({ status: "error", message: err });
  });
};

const updateUser = (req, res, next) => {
  const { name } = req.body;

  User.findByIdAndUpdate(
  req.session.user.id,
  {
    name,
  },
  {
    new: true,
  }).then((data) => {
    res.status(200).json({
      status: 'success',
      data,
    })
  }).catch((err) => {
    res.status(400).json({
      status: 'error',
      message: err,
    })
  });
};

module.exports = {
  insertUser,
  getAllUsers,
  getAllUsersEmail,
  getUserById,
  updateUser,
};
