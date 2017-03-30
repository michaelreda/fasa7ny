var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
time:{
  type:Date,
  required:true
},
userId:{
  type:mongoose.Schema.Types.ObjectId,ref:'user',
  required:true
},
activityId:{
  type:mongoose.Schema.Types.ObjectId,ref:'activity',
  required:true
},
rate:{
  type:Number,
  required:true
},
review:{
  type:String,
  required:true
})

var Review = mongoose.model("interest", reviewSchema);

module.exports = review;
