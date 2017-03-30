var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
userId:{
  type:mongoose.Schema.Types.ObjectId,ref:'user',
  required:true
},
serviceProviderId:{
  type:mongoose.Schema.Types.ObjectId,ref:'serviceProvider',
  required:true
},
activityId:{
  type:mongoose.Schema.Types.ObjectId,ref:'activity',
  required:true
},
isHolding:{
  type:Boolean,
  required:true
},
price:{
  type:Number,
  required:true
},
time:{
  type:Date,
  required:true
},
isCancelled:{
  type:Boolean,
  required:true
})

var Booking = mongoose.model("booking", bookingSchema);

module.exports = booking;
