const Chat = require('../models/chatModel');

const insertMessage = (req, res, next) => {
  const { emailSend, emailReceive, message } = req.body;

  Chat.create({
    emailSend,
    emailReceive,
    message,
  }).then((message) => {
    res.status(201).json({
      status: "success",
      data: message,
    })
  }).catch((err) => {
    res.status(400).json({ status: "error", message: err });
  });
};

module.exports = {
  insertMessage,
};
