var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
firstName:{
  type:String,
  required:true
},
lastName:{
  type:String,
  required:true
},
userAccountId:{
  type:String,
},

birthDate:{
  type:Date,
  required:true
},
age:{
  type:Number,
  required:true
},
gender:{
  type:Char,
  required:true
},
privacy:{
  type:Number,
  required:true
},
mobileNumber:{
  type:String,
  required:false
},
profilePicture:{
  type:String,
  required:false
},
interests:[{
  type:mongoose.Schema.Types.ObjectId,ref:'interest',
   required:false
}],

profession:{
  type:String,
  required:false
},
history:[{
  type:mongoose.Schema.Types.ObjectId,ref:'activity',
}],
location:[{
  type:mongoose.Schema.Types.String,
}],
banned:{
  type:Number, default = 0
  required:true
})

var User = mongoose.model("user", userSchema);

module.exports = user;
