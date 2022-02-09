const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  emailSend: {
    type: String,
    required: [true, "emailSend is required"],
  },
  emailReceive: {
    type: String,
    required: [true, "emailReceive is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  data: {
    type: Date,
    default: Date.now(),
  },
}, { collection: 'chat' });

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
