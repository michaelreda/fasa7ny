var mongoose = require('mongoose');

var serviceProviderSchema = mongoose.Schema({
title:{
  type:String,
  required:true
},
description:{
  type:String,
  required:true
},
legalProof:{
  type:String,
  required:true
},
entertainmentType:[{
  type:String,
  required:true
}],
activities:[{
    type:mongoose.Schema.Types.ObjectId,ref:'activity',
    required:true
  }],
branches:[{
  type:String,
  required:true
}],
contactMobile:[{
  type:String,
  required:true
}],
media:[{
  type:{type:String},
  url:{type:String}
}],
previousClients:[{
  type:mongoose.Schema.Types.ObjectId,ref:'user',
  required:true
}],
isApproved:{
  type:Boolean
},
isGolden:{
  type:Boolean
},
rating:{
  type:Number
},
ratingCount:{
  type:Number
},
banned:{
  type:Number, default = 0
  required:true
})

var ServiceProvider = mongoose.model("serviceProvider", serviceProviderSchema);

module.exports = serviceProvider;
