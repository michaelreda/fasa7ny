let log = require('../models/log.js');



let adminCTRL = {

//4.5 admin views system logs
viewSystemLogs: function(req,res){
  log.find(function(err, log){

        if(err)
            res.send(err.message); //display messages
        else
            res.render('viewSystemLogs',{"logs":log});
    })
},


updateLogs: function(req,res){
// will not be done, delete from SRS
},

//4.5 admin deletes system logs
deleteLogs: function(req,res){
  log.remove(function(err, log){
    if(err)
      res.send(err.message);
    else {
       res.render('logPage');
    }
  })

}







}
