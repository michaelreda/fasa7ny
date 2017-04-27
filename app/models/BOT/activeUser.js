var mongoose = require('mongoose');

var activeUserSchema = mongoose.Schema({
  facebookID: String,
  firstName:String,
  lastName:String,
  location : {
    lat:Number,
    long:Number
  },
  gender: Boolean, //true -> male
  currentScenario: {type:mongoose.Schema.Types.ObjectId,ref:'scenario'},
  NextScenarioMessage: {type:Number,default:-1}
})

var ServiceProvider = mongoose.model("activeUser", activeUserSchema);

module.exports = ActiveUser;
