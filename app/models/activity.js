var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({


    title:{
        type:String,
        required:true,
        unique:false
    },
    type:{
        type:String,
        required:true,
        unique:false
    },
    serviceProviderId:{
        type:String,
        required:true,
        unique:false
    },
     media:[{type:String,
            url:String }],

   prices:[{
        numberOfClients:Number,
        price:Number,
    }],
    durationInMinutes:{
        type:Number,
        required:true,
        unique:false
    },
    timings:[{day:String,
      startTime:Date}],
     minAge:{
        type:Number,
        required:false,
        unique:false
    },
    maxAge:{
        type:Number,
        required:false,
        unique:false
    },
    minClientNumber:{
        type:Number,
        required:true,
        unique:false
    },
    maxClientNumber:{
        type:Number,
        required:true,
        unique:false
    },
    rating:{
        type:Number,
        required:false,
        unique:false
    },
    ratingCount:{
        type:Number,
        required:false,
        unique:false
    }


});

var Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
