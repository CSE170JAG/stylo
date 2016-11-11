var fs = require('fs');

exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  var eventTitle = req.params.eventTitle;
  //console.log("Event title is " + eventTitle );

  var locationId = req.params.userId;
  //console.log("Location Id is " + locationId );
  //console.log( "Event Title in URL is " + eventTitle);

  var eventIndex;

  for(var j = 0; j < data[locationId].eventList.length; j++){
    var eventObj = data[req.params.userId].eventList[j];

    if(eventObj["summary"].trim() === (eventTitle) ){
      eventIndex = j;
      break;
    }
  }
  var eventDetails  = data[locationId].eventList[eventIndex];

  //console.log( "EVENT DETAILS" );
  //console.log( eventDetails );

  var eventDate = eventDetails["start"]["date"];
  var eventTime = eventDetails["start"]["time"];

  console.log("Event date: " + eventDate + ", event time: " + eventTime);

  var eventDescription = eventDetails["description"];

  //console.log("Event Description: " + eventDescription);
  console.log(data[req.params.userId]);

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
