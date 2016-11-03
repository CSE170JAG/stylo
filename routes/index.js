
/*
 * GET home page.
 */
 //Google Calendar API
var fs = require('fs');
exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var clothes = [];
  var events = data["eventList"];
  for(var i = 0; i < events.length; i++){
    var eventSummary = (events[i]["summary"]).split(" ");
    var eventKey = eventSummary[0].toLowerCase();
    for(var j = 0; j < 3; j++){
      //var randomItem = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      clothes.push(JSON.parse('{ "itemDesc": "' + data["inventory"][eventKey][j] +'"}'));
    }
  }
  data['clothList'] = clothes;
  res.render('index', data );
};
