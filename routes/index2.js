
/*
 * GET home page.
 */

var fs = require('fs');
var Forecast = require('forecast');

var fcData;
var forecast = new Forecast({
  service: 'darksky',
  key: '4996cab08400f882874b1f26572f8172',
  units: 'fahrenheit',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});

// Retrieve weather information, ignoring the cache
forecast.get([32.7157, 117.1611], true, function(err, weather) {
  if(err) return console.dir(err);
  fcData = weather;
});

exports.view = function(req, res){
  console.log(req.session);
  var userId = req.params.userId;
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var clothes = [];
  var events = data[userId]["eventList"];
  for(var i = 0; i < events.length; i++){
    var eventSummary = (events[i]["summary"]).split(" ");
    var eventKey = eventSummary[0].toLowerCase();
    for(var j = 0; j < 3; j++){
      //var randomItem = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      if(data["inventory"][eventKey]){
          clothes.push(data["inventory"][eventKey][j]);
          console.log(data["inventory"][eventKey][j]);
      }
    }
  }
  data[userId]['clothList'] = clothes;
  data[userId]['weather'] = fcData;
  res.render('index2', data[userId]);
};
