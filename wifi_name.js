var wifiLocation = require('wifi_location')

wifiLocation.wifiTowers(function(err, val) {
   console.log(val);
    if( typeof(val) == 'object') {
      if(val[0].ssid === "OLA_CORP" || val[0].ssid === "OLA_MOBILE" || val[0].ssid === "OLA_GUEST"){
         console.log("In office");
      } else if( val.filter(function(value){ return value.ssid=="BlackPerl";})){ //    val[0].ssid === "Pankaj-Navani" || val[0].ssid === "OLA_MOBILE" || val[0].ssid === "OLA_GUEST"){
        console.log("In Home");
      }
    } 
   
})

wifiLocation.location(function(err, val) {
    console.log(err, val)
})
