var fs = require('fs');

exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  var eventTitle = req.params.eventTitle;
  console.log( "Event Title in URL is " + eventTitle);

  var eventIndex;

  for(var j = 0; j < data.eventList.length; j++){
    var eventObj = data.eventList[j];

    if(eventObj["summary"].trim() === (eventTitle) ){
      eventIndex = j;
      break;
    }
  }
  var eventDetails  = data.eventList[eventIndex];

  console.log( "EVENT DETAILS" );
  console.log( eventDetails );

  var eventDate = eventDetails["start"]["date"];
  var eventTime = eventDetails["start"]["time"];

  console.log("Event date: " + eventDate + ", event time: " + eventTime);

  var eventDescription = eventDetails["description"];

  console.log("Event Description: " + eventDescription);


  res.render('editEvent', {
      'sendTitle': eventTitle,
      'sendDate': eventDate,
      'sendTime': eventTime,
      'sendDescription': eventDescription
  });
};
