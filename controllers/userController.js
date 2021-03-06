const User = require("../models/userModel");
const fs = require('fs');

const deleteByBody = (req, res, next) => {
  User.deleteMany(req.body).then((data) => {
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

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.session.user.id).then((data) => {
    res.status(204).json({
      status: 'success',
      data: null,
    })
  }).catch((err) => {
    res.status(400).json({
      status: 'error',
      message: err,
    })
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

const getByQuery = (req, res, next) => {  
  User.find(req.query).then((data) => {
    res.status(200).json({
      status: 'success',
      data,
    })
  }).catch((err) => {
    res.status(400).json({ status: 'error', message: err });
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

const insertBackup = (req, res, next) => {
  const { users } = JSON.parse(fs.readFileSync(`${__dirname}/../backup.json`));

  User.insertMany(users).then((data) => {
    res.status(200).json({
      status: 'success',
      data,
    })
  }).catch((err) => {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  });
};

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

const replaceUser = (req, res, next) => {  
  User.replaceOne(
  { _id: req.session.user.id},
  req.body
  ).then((data) => {
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

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
  req.session.user.id,
  req.body,
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
  deleteByBody,
  deleteUser,
  getAllUsers,
  getAllUsersEmail,
  getByQuery,
  getUserById,
  insertBackup,
  insertUser,
  replaceUser,
  updateUser,
};
