var fs = require('fs');

exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  var eventTitle = req.params.eventTitle;
  console.log("Event title is " + eventTitle );

  var locationId = req.query.user;
  console.log("Location Id is " + locationId );
  console.log( "Event Title in URL is " + eventTitle);

  var eventIndex = 0;

  for(var j = 0; j < data[locationId].eventList.length; j++){
    var eventObj = data[locationId].eventList[j];

    if(eventObj["summary"].trim() === (eventTitle) ){
      eventIndex = j;
      break;
    }
  }
  var eventDetails  = data[locationId].eventList[eventIndex];
  var eventDate = eventDetails["start"]["date"];
  var eventTime = eventDetails["start"]["time"];

  console.log("Event date: " + eventDate + ", event time: " + eventTime);

  var eventDescription = eventDetails["description"];

  //console.log("Event Description: " + eventDescription);
  console.log(data[req.query.user]);

  res.render('editEvent', {
      'sendTitle': eventTitle,
      'sendDate': eventDate,
      'sendTime': eventTime,
      'sendDescription': eventDescription,
      'userInfo': {
          'username': locationId
      }
  });
};
