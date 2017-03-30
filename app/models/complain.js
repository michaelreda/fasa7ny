var mongoose = require('mongoose');

var complainSchema = mongoose.Schema({
issuerId:{
  type:mongoose.Schema.Types.ObjectId,ref:'user',
  required:true
},
intendedId:{
  type:mongoose.Schema.Types.ObjectId,ref:'serviceProvider',
  required:true
},
isType:{
  type:Boolean,
  required:true
},
complain:{
  type:String,
  required:true
},
isSeen:{
  type:Boolean,
  required:true
})

var Complain = mongoose.model("complain", complainSchema);

module.exports = complain;
