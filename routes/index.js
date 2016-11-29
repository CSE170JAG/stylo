
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
  var userId = req.query.user;
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  data[userId]['testVersion1'] = '1';
  var clothes = [];
  var events = data[userId]["eventList"];
  var today = new Date(); //get the current date
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); //account for timezone differences
  today = today.toISOString().substring(0, 10); //reformat the string to match our data.json
  console.log( "today is " + today );
  for(var i = 0; i < events.length; i++){
    var eventSummary = (events[i]["summary"]).split(" ");
    var eventKey = eventSummary[0].toLowerCase();
    var inventory = data["inventory"][eventKey];
    //var randomItem = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    if( events[i]["start"]["date"] == today && data["inventory"][eventKey]){
      clothes = clothes.concat(inventory);
    }
  }
  var uniqueClothes = {};
  for(var i = 0; i < clothes.length; i++){
    if(!uniqueClothes[clothes[i]]){
      uniqueClothes[clothes[i].itemName] = clothes[i];
    }
  }
  var newClothes = [];
  for(var name in uniqueClothes){
    newClothes.push(uniqueClothes[name]);
  }
  data[userId]['clothList'] = newClothes;
  data[userId]['weather'] = fcData;

  data[userId]["suggestAdd"] = false;

  res.render('index', data[userId]);
};

exports.viewSuggestAdd = function(req, res){
  console.log(req.session);
  var userId = req.query.user;
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  data[userId]['testVersion2'] = '2'
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
