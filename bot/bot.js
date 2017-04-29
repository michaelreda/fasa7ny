var express= require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var DB_URI =  "mongodb://admin:admin@ds147920.mlab.com:47920/fasa7ny";
const BootBot = require('bootbot');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var request = require('request');


let BotUser = require('../app/models/BOT/botUser.js');
let ActiveUser = require('../app/models/BOT/activeUser.js');
let Scenario = require('../app/models/BOT/scenario.js');

app.use(bodyParser.urlencoded({extended:false})); //this line must be on top of app config
app.use(bodyParser.json());
mongoose.connect(DB_URI,function(err){
  console.log("connecting to global db..");
});

const bot = new BootBot({
  accessToken: 'EAAGSyhSPqgYBAHZBt1qMRQheLU8IkKg0wcsswCMz2P3q3iEUZALSs1lWCim9nCiNaycA9YVvmEKVJSFHpgdB2VrUKf9uC35lAt4V5ieLL9tRx1oLaDM17hGhH6N0snExBoIFPdKMV5jKE2uTGq2MZCogCRXaANL2z2vBT2IpQZDZD',
  verifyToken: 'fasa7ny_kotomoto_se_2017_fb_bot_platform_MEANstack',
  appSecret:'7adeb0686283b3427bda311cd0eea139'
});

start_chatting = bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  var chat_user;
  chat.getUserProfile().then((user) => {
    chat_user= user;
    console.log("message----------------------------------------------------") ;
    console.log(payload);
    console.log(chat_user);


    //checking if this user is already in our users database or not;
    var query = {facebookID:payload.sender.id},
    update = {firstName:chat_user.first_name ,lastName:chat_user.last_name, facebookID: payload.sender.id, },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    BotUser.findOneAndUpdate(query, update, options,function(err,botUser){
      // console.log("checking if this user is already in our users database or not;");
      if(err)
      console.log(err)
      else{

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

              chat.conversation((convo) => {
                // askUserSpecificActivityOrNot(convo);


                convo.on('postback:about_us', (payload, chat) => {
                  chat.say(`Nowadays, people of different ages are keen to search for different activities that are away from traditional ones such as just watching some movies at the cinema or simply hanging out in malls.`);
                  chat.say(`Due to the increasing number of new innovative ideas for entertainment throughout the past century, most people find themselves lost while trying to figure out which activity to go for that suits their age, taste and personality.`);
                  chat.say(`Others know about an activity but have no idea how to know more about it, where to find it or check some reviews about it. Some innovative ideas for activities are still ambiguous to many people.`);
                  convo.end();
                });



                //first question


                const question1 = {
                  text: `Hello, welcome to Fasa7ny.. Are you looking for a specific activity?`,
                  buttons: [{type: 'postback',title:'yes',payload: 'search_for_specific_activity'}
                            , {type: 'postback',title:'no',payload: 'search_for_activities'}]
                };

                const answer1 = (payload, convo) => {
                  // const text = payload.message.text;
                  // convo.say(`Oh, you like ${text}!`);
                };

                const callbacks1 = [
                  {
                    event: 'postback:search_for_specific_activity',
                    callback: () => {
                      convo.ask(questionActivityName, answerActivityName);}
                  },
                  {
                    event: 'postback:search_for_activities',
                    callback: () => { convo.ask(questionFilter, answerFilter,callbacksFilter);}
                  }
                ];

                const options1 = {
                  typing: true // Send a typing indicator before asking the question
                };

                convo.ask(question1, answer1, callbacks1);
                //end first question


                // if asking for specific activity;
                const questionActivityName = "Ok being a decisive is good, tell us the name of this activity..";

                const answerActivityName = (payload, convo) => {
                  const text = payload.message.text;
                  convo.say(`Ok I am searching for you now what i know about ${text}!`);

                  request
                  .get('https://fasa7ny.herokuapp.com:'+process.env.PORT+'/search_for_activities/'+text+'/_/')
                  .on('response', function(response) {
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response);
                  })
                  .on('error', function(err) {
                    console.log(err)
                  })
                  // http.get({
                  //   host: 'https://fasa7ny.herokuapp.com',
                  //   port: process.env.PORT,
                  //   path: '/search_for_activities/'+text+'/_/'
                  // }, function(response) {
                  //   console.log(response);
                  // });
                };

                //end if asking for specific activity;


                // if filtering;
                const questionFilter = {
                  text: `Ok Please specify which type of filters do you prefer..`,
                  quickReplies: [
                                 {title:'I don\'t care',payload: 'filter_no'},
                                 {title:'Day',payload: 'filter_day'},
                                 {title:'Price',payload: 'filter_price'},
                                 {title:'Offers',payload: 'filter_offer'},
                                 {title:'Theme',payload: 'filter_theme'},
                                 {title:'Rating',payload: 'filter_rating'}
                               ]
                };

                const answerFilter = (payload, convo) => {

                };

                const callbacksFilter = [
                  {
                    event: 'quick_reply:filter_no',
                    callback: () => {
                      convo.say("activities should be displayed here")
                    }
                  },
                  {
                    event: 'quick_reply:filter_day',
                    callback: () => {
                      convo.say({
                        text: `Ok Please specify which day`,
                        quickReplies: [{title:'Saturday',payload: 'filter_sat'},
                                       {title:'Sunday',payload: 'filter_sun'},
                                       {title:'Monday',payload: 'filter_mon'},
                                       {title:'Tuesday',payload: 'filter_tue'},
                                       {title:'Wednesday',payload: 'filter_wed'},
                                       {title:'Thursday',payload: 'filter_thu'},
                                       {title:'Friday',payload: 'filter_fri'}
                                     ]
                      });
                    }
                  },
                  {
                    event: 'quick_reply:filter_price',
                    callback: () => {
                      convo.say({
                        text: `Ok Please specify which price category`,
                        quickReplies: [{title:'-50',payload: 'filter_50'},
                                       {title:'50-100',payload: 'filter_50_100'},
                                       {title:'100-200',payload: 'filter_100_200'},
                                       {title:'200+',payload: 'filter_200'}
                                     ]
                      });
                    }
                  },
                  {
                    event: 'quick_reply:filter_offer',
                    callback: () => {
                      convo.say("offers should be displayed");
                    }
                  },
                  {
                    event: 'quick_reply:filter_theme',
                    callback: () => {
                      convo.say({
                        text: `Ok Please select one of the themes`,
                        quickReplies: [{title:'thriller',payload: 'filter_thriller'},
                                       {title:'relaxing',payload: 'filter_relaxing'},
                                       {title:'horror',payload: 'filter_horror'},
                                       {title:'clubs',payload: 'filter_clubs'},
                                       {title:'educational',payload: 'filter_educational'},
                                       {title:'children',payload: 'filter_children'}
                                     ]
                      });
                    }
                  },
                  {
                    event: 'quick_reply:filter_rating',
                    callback: () => {
                      convo.say({
                        text: `Ok Please specify which rating category`,
                        quickReplies: [{title:'1+',payload: 'filter_1'},
                                       {title:'2+',payload: 'filter_2'},
                                       {title:'3+',payload: 'filter_3'},
                                       {title:'4+',payload: 'filter_4'},
                                       {title:'5', payload: 'filter_5'}
                                     ]
                      });
                    }
                  }
                ];
                //end filtering ;

                convo.end();

              });





              // const askUserSpecificActivityOrNot = (convo) => {
              //     convo.ask(`Hello, welcome to Fasa7ny.. Are you looking for a specific activity?`, (payload, convo) => {
              //     const text = payload.message.text;
              //     convo.set('name', text);
              //     convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
              //   });
              // };



              // Scenario.findOne({title:"welcome"},function(err,scenario){
              //   console.log("fetched welcome scenario");
              //   // let buttons = new Buttons();
              //   let buttons =[];
              //
              //   if(scenario.buttons && scenario.buttons.length !=0){
              //     for(var i =0;i<scenario.buttons.length;i++)
              //     buttons.push({type: 'postback',title: scenario.buttons[i].text,payload: scenario.buttons[i].event});
              //
              //   }
              //   chat.say({text: scenario.messages[0],buttons});
              //   console.log("updating activity user currentScenario and NextScenarioMessage");
              //   ActiveUser.update({_id:activeUser._id},{$set:{'currentScenario':scenario._id,'NextScenarioMessage':1}}).exec();
              // })
            }
          }
        });

      }
    })
  });



  // out.add({text: `hello ${sender.first_name} , how are you!`});
  // await bot.send(sender.id, out);


});

//adding menu buttons

              bot.setPersistentMenu([
                {
                  title: 'Language اللغة',
                  type: 'nested',
                  call_to_actions: [
                    {
                      title: 'العربية',
                      type: 'postback',
                      payload: 'lang_arabic'
                    },
                    {
                      title: 'English',
                      type: 'postback',
                      payload: 'lang_english'
                    }
                  ]
                },
                {
                  title: 'Website الموقع',
                  type: 'web_url',
                  url: 'http://purple.com'
                },
                {
                  title: 'About us مين احنا',
                  type: 'postback',
                  payload: 'about_us'
                }
              ], false);

              bot.on('postback:about_us', (payload, chat) => {
                chat.say(`Nowadays, people of different ages are keen to search for different activities that are away from traditional ones such as just watching some movies at the cinema or simply hanging out in malls.`);
                chat.say(`Due to the increasing number of new innovative ideas for entertainment throughout the past century, most people find themselves lost while trying to figure out which activity to go for that suits their age, taste and personality.`);
                chat.say(`Others know about an activity but have no idea how to know more about it, where to find it or check some reviews about it. Some innovative ideas for activities are still ambiguous to many people.`);
              });

              bot.on('postback:lang_arabic', (payload, chat) => {
                chat.set("language", "arabic");
                chat.say("أهلا بك فى فسحنى تم تغيير اللغة");
                start_chatting;
              });

              bot.on('postback:lang_english', (payload, chat) => {
                chat.set("language", "english");
                chat.say("Welcome to Fasa7ny");
                start_chatting;
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
