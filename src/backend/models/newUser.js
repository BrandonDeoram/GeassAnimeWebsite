const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newUserScheme = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  toWatch: {
    type: Array,
    required: true,
  },
  watching: {
    type: Array,
    required: true,
  },
  completed: {
    type: Array,
    required: true,
  },
});

const newUser = mongoose.model("WatchList", newUserScheme);
module.exports = newUser;
