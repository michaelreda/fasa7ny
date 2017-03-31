let User = require('../models/user');
let ServiceProvider = require('../models/serviceProvider');

let globalCTRL ={
banDecrement:function(){
  User.update({
       "banned": {'$ne':0}
      }, {
        $inc: { "banned": -1 }
      }, {
        multi: true
      });
      ServiceProvider.update({
           "banned": {'$ne':0}
          }, {
            $inc: { "banned": -1 }
          }, {
            multi: true
          });
}


}

module.exports = globalCTRL;
