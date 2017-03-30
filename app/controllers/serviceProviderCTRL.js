let ServiceProvider = require('../models/serviceProvider');

let serviceProviderCTRL = {


   createServiceProvider:function(req, res){
        let serviceProvider = new ServiceProvider(req.body);
        
        
        serviceProvider.save(function(err, serviceProvider){
            if(err){
                res.send(err.message);
            }
            else{

                res.send(200);
            }
        });
    }



    };

module.exports = serviceProviderCTRL;