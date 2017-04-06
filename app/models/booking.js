var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
userId:{
  type:Number,//mongoose.Schema.Types.ObjectId,ref:'user',
  required:true
},
serviceProviderId:{
  type:Number,//mongoose.Schema.Types.ObjectId,ref:'serviceProvider',
  required:true
},
activityId:{
  type:mongoose.Schema.Types.ObjectId,ref:'activity',
  required:true
},
isHolding:{
  type:Boolean,
  //required:true
},
price:{
  type:Number,
  required:true
},
time:{
  type:Number,//Date,
  required:true
},
isConfirmed:{
  type:Boolean,
  required:true,
  default:false
},
isCancelled:{
  type:Boolean,
  required:true,
  default:false
}})

var Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
