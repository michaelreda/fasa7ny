var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
firstName:{
  type:String,
  required:true
},
lastName:{
  type:String,
  required:true
})

var Admin = mongoose.model("interest", adminSchema);

module.exports = Admin;
