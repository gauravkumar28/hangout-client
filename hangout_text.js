var hangoutsBot = require("hangouts-bot");
var bot = new hangoutsBot("gaurav.kumar3@olacabs.com", "Jjmsty12#$");
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
        if(val[0].ssid === "OLA_CORP" || val[0].ssid === "OLA_MOBILE" || val[0].ssid === "OLA_GUEST"){
           bot.sendMessage(from, "In office");
        } else if( val.filter(function(value){ return value.ssid=="BlackPerl";})){  //         val[0].ssid === "Pankaj-Navani" || val[0].ssid === "OLA_MOBILE" || val[0].ssid === "OLA_GUEST"){
        //  console.log("In Home");
           bot.sendMessage(from, "In Home");
        }
     }

    })
   
   //bot.sendMessage(from, "At my place 4f-448");
    } else {
       
    var args = {
      data: { msg: message },
      headers: { "Content-Type": "application/json" }
    };

    console.log(args);
    client.put("HTTP://localhost:5000/query", args, function (data, response) {
    // parsed response body as js object
      data = JSON.parse(data)

      bot.sendMessage(from, data.res);
    }).on('error', function (err) {
    console.log('something went wrong on the request', err.request.options);
});

     //console.log(message); 
     //bot.sendMessage(from, "I an example Hangouts bot. Try saying hello.");
    }
});

