const mongoose = require('mongoose');
const MobileSchema = new mongoose.Schema({
  company : String,
  model : String,
  price : Number
}, {timestamps : true})


module.exports = mongoose.model("Mobile", MobileSchema)
