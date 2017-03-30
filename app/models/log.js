var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
type:{
  type:String,
  required:true
},
userId:{
  type:mongoose.Schema.Types.ObjectId,ref:'user',
  required:true
},
time:{
  type:Date,
  required:true
},
errorMessage:{
  type:String,
  required:true
})

var Log = mongoose.model("interest", logSchema);

module.exports = log;
