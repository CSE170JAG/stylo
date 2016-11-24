
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var fs = require('fs');

// Example route
// var user = require('./routes/user');
var index = require('./routes/index');

// For use in A/B testing
var index2 = require('./routes/index2');

var addEvents = require('./routes/addEvents');
var manageEvents = require('./routes/manageEvents');
var accountPage = require('./routes/accountPage');
var emailPage = require('./routes/emailPage');
var login = require('./routes/login');
var register = require('./routes/register');
var settingPage = require('./routes/settingPage');
var faqPage = require('./routes/faqPage');
var editEvent = require( './routes/editEvent');

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
  var addData = req.body;
  data[addData.userId].eventList.push(addData.event);

  fs.writeFileSync('data.json', JSON.stringify(data));
  res.header("Access-Control-Allow-Origin", "*");
  res.send(addData.userId);
});

app.post('/deleteEvent', function(req,res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var deleteData = req.body;
  var updatedEvents = data[deleteData.userId].eventList;
  for(var j = 0; j < updatedEvents.length; j++){
    var eventObj = updatedEvents[j];

    if(eventObj["summary"].trim() === (deleteData.event).trim()){
      updatedEvents.splice(j,1);
      break;
    }
  }
  data[deleteData.userId].eventList = updatedEvents;
  //console.log(req.body["toDelete"]);

  fs.writeFileSync('data.json', JSON.stringify(data));
  res.send(deleteData.userId);
});

app.post('/confirmLogin', function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.header("Access-Control-Allow-Origin", "*");

  var loginObj = req.body;
  var registerList = data['regList'];

  if( registerList.hasOwnProperty(loginObj.uN) ){
    if( registerList[loginObj.uN] === loginObj.uP){
      res.send(loginObj.uN);
    }else{
      res.send("false");
    }
  }else{
    res.send("false");
  }
});


app.post('/register', function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  var userData = req.body;
  data.regList[userData.uN] = userData.pass;

  data[userData.uN] = {
    userInfo: {
      username: userData.uN,
      fname: userData.fN,
      lname: userData.lN,
      upass: userData.pass,
      profileImg: "http://placehold.it/100/100"
    },
    eventList: []
  }

  fs.writeFileSync('data.json', JSON.stringify(data));
  console.log("Updated Data");
  res.header("Access-Control-Allow-Origin", "*");
  res.send(userData.uN);
});

app.post('/updateEvent', function(req, res){
    var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

    var updateData = req.body;
    console.log(updateData);

    var eventList =  data[updateData.userId].eventList;
    for(var i = 0; i < eventList.length; i++){
      var eventObj = eventList[i];
      if(eventObj.summary === (updateData.oldEventTitle).trim()){
        eventObj.start.date = updateData.event.start.date;
        eventObj.start.time = updateData.event.start.time;
        eventObj.description = updateData.event.description;
        eventObj.summary = updateData.event.summary;
        break;
      }
    }
    data[updateData.userId].eventList = eventList;
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.send(updateData.userId);

});

app.get('/', login.view);
app.get('/loggedin/', index.view);

// For use in A/B testing
app.get('/loggedin2/:userId', index.viewSuggestAdd);
//app.get('/loggedin2/:userId', index2.view);


app.get('/addEvents/', addEvents.view);
app.get('/manageEvents/', manageEvents.view);
app.get('/accountPage/', accountPage.view);
app.get('/emailPage/:userId', emailPage.view);
app.get('/login', login.view);
app.get('/register', register.view);
app.get('/settingPage', settingPage.view);
app.get('/faqPage/', faqPage.view);
app.get('/editEvent/:eventTitle/', editEvent.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
