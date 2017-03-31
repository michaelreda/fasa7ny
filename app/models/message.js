var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
fromId:{
  type: Number,
  required: true
},
message:[{
  isUser:{type:Boolean},
  message:{type:String},
  time:{type:Date},
}],
isSeen:{
  type:Boolean,
  required:true
}})

var Message = mongoose.model("message", messageSchema);

module.exports = message;
