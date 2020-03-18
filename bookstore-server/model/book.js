const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title : String,
  category : String,
price : String,
name : String,
phone : String,
email : String,
  image_url0: String, // uploads/ksadfkasdf.jpg
  image_url1: String, // uploads/ksadfkasdf.jpg
  image_url2: String, // uploads/ksadfkasdf.jpg
  image_url3: String, // uploads/ksadfkasdf.jpg
  image_url4: String, // uploads/ksadfkasdf.jpg
  image_url5: String, // uploads/ksadfkasdf.jpg
  image_url6: String, // uploads/ksadfkasdf.jpg
},{timestamps : true})

module.exports = mongoose.model("Book", BookSchema);
