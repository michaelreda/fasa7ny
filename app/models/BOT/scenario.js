var mongoose = require('mongoose');

var scenarioSchema = mongoose.Schema({
  title: String,
  messages:[{
    type: String,
    required:true
  }],
  buttons: [{
    type: String
  }]
})

var ServiceProvider = mongoose.model("scenario", scenarioSchema);

module.exports = Scenario;
