
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var fs = require('fs');

var Forecast = require('forecast');

// Example route
// var user = require('./routes/user');
var index = require('./routes/index');
var addEvents = require('./routes/addEvents');
var manageEvents = require('./routes/manageEvents');
var accountPage = require('./routes/accountPage');
var settingPage = require('./routes/settingPage');
var faqPage = require('./routes/faqPage');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Stylo secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// // Initialize
// var forecast = new Forecast({
//   service: 'darksky',
//   key: '4996cab08400f882874b1f26572f8172',
//   units: 'celcius',
//   cache: true,      // Cache API requests
//   ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
//     minutes: 27,
//     seconds: 45
//   }
// });
//
// function getWeather(){
//   // Retrieve weather information from coordinates (Sydney, Australia)
//   forecast.get([-33.8683, 151.2086], function(err, weather) {
//     if(err) return console.dir(err);
//     return(weather);
//   });
// }


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// Add routes here
//app.get('/', index.view);

app.post('/', function (req, res) {
  res.send(JSON.parse(fs.readFileSync('data.json', 'utf8')));
});
app.post('/addEvent', function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  data.eventList.push(req.body)

  fs.writeFileSync('data.json', JSON.stringify(data));
  console.log("Updated Data");
  res.header("Access-Control-Allow-Origin", "*");
  res.send("OK");
});
app.post('/deleteEvent', function(req,res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  console.log(data.eventList)
  var updatedEvents = data.eventList;
  for(var j = 0; j < updatedEvents.length; j++){
    var eventObj = updatedEvents[j];

    if(eventObj["summary"].trim() === (req.body)["toDelete"].trim()){
      updatedEvents.splice(j,1);
    }
  }
  data.eventList = updatedEvents;
  //console.log(req.body["toDelete"]);

  fs.writeFileSync('data.json', JSON.stringify(data));
  res.send("OK");
});

app.get('/', index.view);
app.get('/addEvents', addEvents.view);
app.get('/manageEvents', manageEvents.view);
app.get('/accountPage', accountPage.view);
app.get('/settingPage', settingPage.view);
app.get('/faqPage', faqPage.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
