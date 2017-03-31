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
    isOffer:{
        type:Boolean,
        required:false,
        unique:false 
    },
    serviceProviderId:{
        type:String,
        required:true,
        unique:false   
    },
     media:{
        type:[{type:String,url:String}],
        required:false, 
        unique:false  
    },
   prices:{
        type:[{numberOfClients:Number,price:Number}],
        required:true,  
        unique:false 
    },
    durationInMinutes:{
        type:Number,
        required:true,  
        unique:false 
    },
    timings:{
        type:[{day:String,startTime:Date}],
        required:false,  
        unique:false 
    },
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
    },
    location:{
        type:String,
        required:true,  
        unique:false 
    },
    theme:{
        type:String,
        required:true,  
        unique:false 
    }


});

var Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;