const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true
    },
    mobile: Number,
    password: String
  },{timestamps : true})

module.exports = mongoose.model("User", UserSchema);
