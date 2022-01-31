const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: {
    type: Number,
    default: 18,
  },
  country: {
    type: String,
    default: "Brazil",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
});
const User = mongoose.model("User", usersSchema);

module.exports = {
  User,
};
