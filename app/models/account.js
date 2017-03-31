var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
userName:{
  type:String,
  required:true
},
password:{
  type:String,
  required:true
},
type:{
  type:Number,  //user 0, SP 1
  required:true
},
email:{
  type:String,
  required:true
}})

var Account = mongoose.model("account", accountSchema);

module.exports = Account;
