var hangoutsBot = require("hangouts-bot");
var bot = new hangoutsBot(process.env.USERNAME, process.env.PASSWORD);
var Client = require('node-rest-client').Client;
var client = new Client();
bot.on('online', function() {
    console.log('online');
});

bot.on('message', function(from, message) {
  if(message.toLowerCase().trim() === "ok" || message.toLowerCase().trim() === "k"|| message.toLowerCase().trim() === "cool"){
    bot.sendMessage(from, "hmm..");
  } else if(message.toLowerCase().trim() === "hi" || message.toLowerCase().trim() === "hey"|| message.toLowerCase().trim() === "hello"){
    bot.sendMessage(from, "Hello");
  } else if (message.toLowerCase().trim() === "?" || message.toLowerCase().trim() === "where?" || (message.toLowerCase().trim().indexOf("where") !== -1 && message.toLowerCase().trim().indexOf("?") !== -1 )){
    var wifiLocation = require('wifi_location')
    wifiLocation.wifiTowers(function(err, val) {
      if( typeof(val) == 'object') {
        if(val[0].ssid === "ABC_CORP" || val[0].ssid === "ABC_MOBILE" || val[0].ssid === "ABC_GUEST"){
           bot.sendMessage(from, "In office");
        } else if( val.filter(function(value){ return value.ssid=="BlackPerl";})){
           bot.sendMessage(from, "In Home");
        }
      }

    })
  } else {
     
    var args = {
      data: { msg: message },
      headers: { "Content-Type": "application/json" }
    };

    console.log(args);
    client.put("HTTP://localhost:5000/query", args, function (data, response) {
      data = JSON.parse(data)
      bot.sendMessage(from, data.res);
      }).on('error', function (err) {
        console.log('something went wrong on the request', err.request.options);
    });
  }
});


bot.on('error', function(e) {
  console.log(e);
});

