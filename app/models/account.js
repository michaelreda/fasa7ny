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
  type:Number,
  required:true
},
email:{
  type:String,
  required:true
}})



var Account = mongoose.model("account", accountSchema);

module.exports = Account;
