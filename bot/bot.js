const BootBot = require('bootbot');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
let BotUser = require('../app/models/BOT/botUser.js');
let ActiveUser = require('../app/models/BOT/activeUser.js');
let Scenario = require('../app/models/BOT/scenario.js');
const bot = new BootBot({
  accessToken: 'EAAGSyhSPqgYBAHZBt1qMRQheLU8IkKg0wcsswCMz2P3q3iEUZALSs1lWCim9nCiNaycA9YVvmEKVJSFHpgdB2VrUKf9uC35lAt4V5ieLL9tRx1oLaDM17hGhH6N0snExBoIFPdKMV5jKE2uTGq2MZCogCRXaANL2z2vBT2IpQZDZD',
  verifyToken: 'fasa7ny_kotomoto_se_2017_fb_bot_platform_MEANstack',
  appSecret:'7adeb0686283b3427bda311cd0eea139'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  var chat_user;
  chat.getUserProfile().then((user) => {
    chat_user= user;
    console.log("message----------------------------------------------------") ;
    console.log(payload);
    console.log(chat_user);


    //checking if this user is already in our users database or not;
    BotUser.findOne({facebookID: payload.sender.id},function(err,botUser){
      console.log("checking if this user is already in our users database or not;");
      if(err)
      console.log(err)
      else{

        if(botUser == undefined || botUser == null){//if not, save it
          console.log("no");
          let botuser= new BotUser();
          botuser.firstName= chat_user.first_name;
          botuser.facebookID=payload.sender.id;
          botuser.lastName= chat_user.last_name;

          botuser.save(function(err,user){
            console.log("saving botUser");
            if(err)
            console.log(err);
            else{// adding user to active users;
              let activeuser = new ActiveUser();
              activeuser.botUser= user.id;
              activeuser.save(function(err){
                if(err)
                console.log(err);
              });
            }
          });
        }

        //if it was saved as a bot user before check if it's an active user
        //if it's not an active user add it as a new active user;
        //if it's already an active user update lastResponseAt
        var query = {botUser:botUser._id},
        update = {botUser:botUser._id , lastResponseAt: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

        ActiveUser.findOneAndUpdate(query, update, options,function(error, activeUser) {
          console.log("check if it's an active user");
          if (error)
          console.log(error);
          else{
            var i = activeUser.NextScenarioMessage;
            if(activeUser.currentScenario == undefined || activeUser.currentScenario == null){ //if no scenario at all then choose the welcoming scenario
              console.log("if no scenario at all then choose the welcoming scenario");
              Scenario.findOne({title:"welcome"},function(err,scenario){
                console.log("fetched welcome scenario");
                // let buttons = new Buttons();
                let buttons =[];

                if(scenario.buttons && scenario.buttons.length !=0){
                  for(var i =0;i<scenario.buttons.length;i++)
                  buttons.push({type: 'postback',title: scenario.buttons[i].text,payload: scenario.buttons[i].event});

                }
                chat.say({text: scenario.messages[0],buttons});
                console.log("updating activity user currentScenario and NextScenarioMessage");
                ActiveUser.update({_id:activeUser._id},{$set:{'currentScenario':scenario._id,'NextScenarioMessage':1}}).exec();
              })
            }
          }
        });
      }
    })
  });



  // out.add({text: `hello ${sender.first_name} , how are you!`});
  // await bot.send(sender.id, out);


});

bot.start(process.env.PORT||3000);

//reseting Active users every 15 minutes except users that has just been active last 5 minutes
var job4 = schedule.scheduleJob('0 */15 * * * *',function(){
  var d = new Date();
  d.setMinutes(d.getMinutes()-5);
  ActiveUser.find({lastResponseAt: {$lt: d}}).remove().exec();
});


// var express = require('express')
// var bodyParser = require('body-parser')
// var request = require('request')
// var app = express();
//
// import {Bot, Elements} from 'facebook-messenger-bot';
// const bot = new Bot('EAAGSyhSPqgYBAHZBt1qMRQheLU8IkKg0wcsswCMz2P3q3iEUZALSs1lWCim9nCiNaycA9YVvmEKVJSFHpgdB2VrUKf9uC35lAt4V5ieLL9tRx1oLaDM17hGhH6N0snExBoIFPdKMV5jKE2uTGq2MZCogCRXaANL2z2vBT2IpQZDZD',
// 'fasa7ny_kotomoto_se_2017_fb_bot_platform_MEANstack');
//
//
// app.use('/fb_bot', bot.router());
//
// bot.on('message', async message => {
//     const {sender} = message;
//     console.log("message----------------------------------------------------" +message);
//     await sender.fetch('first_name');
//     // console.log(`${sender.first_name} ${sender.last_name} ${sender.gender} ${sender.location}`);
//     const out = new Elements();
//     out.add({text: `hello ${sender.first_name} , how are you!`});
//
//     await bot.send(sender.id, out);
// });
//
// //setting greeting message ..
// (async function () {
//   console.log(await bot.setGreeting('Hi, shaklak 3yz tetfasa7 enahrda... 3amel 7esabak 3ala kam kda ?'));
//   console.log(await bot.setGetStarted({data: {action: 'GET_STARTED'}}));
// })();
//
// //reseting Active users every 15 minutes except users that has just been active last 5 minutes
// var job4 = schedule.scheduleJob('0 */15 * * * *',function(){
//   var d = new Date();
//   d.setMinutes(d.getMinutes()-5);
//   ActiveUser.find({created_at: {$lt: d}}).remove().exec();
// });
//
// // //EAAGSyhSPqgYBAHZBt1qMRQheLU8IkKg0wcsswCMz2P3q3iEUZALSs1lWCim9nCiNaycA9YVvmEKVJSFHpgdB2VrUKf9uC35lAt4V5ieLL9tRx1oLaDM17hGhH6N0snExBoIFPdKMV5jKE2uTGq2MZCogCRXaANL2z2vBT2IpQZDZD
// // app.set('port', (process.env.PORT || 5000))
// //
// // // Process application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({extended: false}))
// //
// // // Process application/json
// // app.use(bodyParser.json())
// //
// // // Index route
// // app.get('/', function (req, res) {
// //     res.send('Hello world, I am a chat bot')
// // })
// //
// // // for Facebook verification
// // app.get('/webhook/', function (req, res) {
// //     if (req.query['hub.verify_token'] === 'Aha_Moment_Labs') {
// //         res.send(req.query['hub.challenge'])
// //     }
// //     res.send('Error, wrong token')
// // })
// //
// // // Spin up the server
// // app.listen(app.get('port'), function() {
// //     console.log('running on port', app.get('port'))
// // })
// //
// //
// // // API End Point - added by Stefan
// //
// // app.post('/webhook/', function (req, res) {
// //     messaging_events = req.body.entry[0].messaging
// //     for (i = 0; i < messaging_events.length; i++) {
// //         event = req.body.entry[0].messaging[i]
// //         sender = event.sender.id
// //         if (event.message && event.message.text) {
// //             text = event.message.text
// //             if (text === 'hi') {
// //                 sendGenericMessage(sender)
// //                 continue
// //             }
// //             sendTextMessage(sender, "parrot: " + text.substring(0, 200))
// //         }
// //         if (event.postback) {
// //             text = JSON.stringify(event.postback)
// //             sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
// //             continue
// //         }
// //     }
// //     res.sendStatus(200)
// // })
// //
// // var token = " enter token here"
// //
// // // function to echo back messages - added by Stefan
// //
// // function sendTextMessage(sender, text) {
// //     messageData = {
// //         text:text
// //     }
// //     request({
// //         url: 'https://graph.facebook.com/v2.6/me/...',
// //         qs: {access_token:token},
// //         method: 'POST',
// //         json: {
// //             recipient: {id:sender},
// //             message: messageData,
// //         }
// //     }, function(error, response, body) {
// //         if (error) {
// //             console.log('Error sending messages: ', error)
// //         } else if (response.body.error) {
// //             console.log('Error: ', response.body.error)
// //         }
// //     })
// // }
// //
// //
// // // Send an test message back as two cards.
// //
// // function sendGenericMessage(sender) {
// //     messageData = {
// //         "attachment": {
// //             "type": "template",
// //             "payload": {
// //                 "template_type": "generic",
// //                 "elements": [{
// //                     "title": "Ai Chat Bot Communities",
// //                     "subtitle": "Communities to Follow",
// //                     "image_url": "http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/...",
// //                     "buttons": [{
// //                         "type": "web_url",
// //                         "url": "https://www.facebook.com/groups/aic...",
// //                         "title": "FB Chatbot Group"
// //                     }, {
// //                         "type": "web_url",
// //                         "url": "https://www.reddit.com/r/Chat_Bots/",
// //                         "title": "Chatbots on Reddit"
// //                     },{
// //                         "type": "web_url",
// //                         "url": "https://twitter.com/aichatbots",
// //                         "title": "Chatbots on Twitter"
// //                     }],
// //                 }, {
// //                     "title": "Chatbots FAQ",
// //                     "subtitle": "Aking the Deep Questions",
// //                     "image_url": "https://tctechcrunch2011.files.wordpress.com/...",
// //                     "buttons": [{
// //                         "type": "postback",
// //                         "title": "What's the benefit?",
// //                         "payload": "Chatbots make content interactive instead of static",
// //                     },{
// //                         "type": "postback",
// //                         "title": "What can Chatbots do",
// //                         "payload": "One day Chatbots will control the Internet of Things! You will be able to control your homes temperature with a text",
// //                     }, {
// //                         "type": "postback",
// //                         "title": "The Future",
// //                         "payload": "Chatbots are fun! One day your BFF might be a Chatbot",
// //                     }],
// //                 },  {
// //                     "title": "Learning More",
// //                     "subtitle": "Aking the Deep Questions",
// //                     "image_url": "http://www.brandknewmag.com/wp-cont...",
// //                     "buttons": [{
// //                         "type": "postback",
// //                         "title": "AIML",
// //                         "payload": "Checkout Artificial Intelligence Mark Up Language. Its easier than you think!",
// //                     },{
// //                         "type": "postback",
// //                         "title": "Machine Learning",
// //                         "payload": "Use python to teach your maching in 16D space in 15min",
// //                     }, {
// //                         "type": "postback",
// //                         "title": "Communities",
// //                         "payload": "Online communities & Meetups are the best way to stay ahead of the curve!",
// //                     }],
// //                 }]
// //             }
// //         }
// //     }
// //     request({
// //         url: 'https://graph.facebook.com/v2.6/me/...',
// //         qs: {access_token:token},
// //         method: 'POST',
// //         json: {
// //             recipient: {id:sender},
// //             message: messageData,
// //         }
// //     }, function(error, response, body) {
// //         if (error) {
// //             console.log('Error sending messages: ', error)
// //         } else if (response.body.error) {
// //             console.log('Error: ', response.body.error)
// //         }
// //     })
// // }
