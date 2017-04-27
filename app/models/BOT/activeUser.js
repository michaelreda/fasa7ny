var mongoose = require('mongoose');

var activeUserSchema = mongoose.Schema({
  // facebookID: String,
  // firstName:String,
  // lastName:String,
  // location : {
  //   lat:Number,
  //   long:Number
  // },
  // gender: Boolean, //true -> male
  botUser: {type:mongoose.Schema.Types.ObjectId,ref:'botUser'},
  currentScenario: {type:mongoose.Schema.Types.ObjectId,ref:'scenario'},
  NextScenarioMessage: {type:Number,default:-1}
})

var ServiceProvider = mongoose.model("activeUser", activeUserSchema);

module.exports = ActiveUser;