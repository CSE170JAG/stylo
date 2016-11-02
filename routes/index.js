
/*
 * GET home page.
 */

exports.view = function(req, res){

  var data = {
    "clothList":[
      {
        "itemImg": "http://placehold.it/100x100",
        "itemDesc": "Red T-Shirt"
      },
      {
        "itemImg": "http://placehold.it/100x100",
        "itemDesc": "Red T-Shirt"
      },
      {
        "itemImg": "http://placehold.it/100x100",
        "itemDesc": "Red T-Shirt"
      },
      {
        "itemImg": "http://placehold.it/100x100",
        "itemDesc": "Red T-Shirt"
      },
      {
        "itemImg": "http://placehold.it/100x100",
        "itemDesc": "Red T-Shirt"
      },
      {
        "itemImg": "http://placehold.it/100x100",
        "itemDesc": "Red T-Shirt"
      }
    ],

    "eventList": [
      {
        'eventDate': '10/25/16',
        'eventTitle': 'Business Meeting',
        'eventDesc': 'Meeting with John Doe for stuff.'
      },
      {
        'eventDate': '10/25/16',
        'eventTitle': 'Business Meeting',
        'eventDesc': 'Meeting with John Doe for stuff.'
      },
      {
        'eventDate': '10/25/16',
        'eventTitle': 'Business Meeting',
        'eventDesc': 'Meeting with John Doe for stuff.'
      },
      {
        'eventDate': '10/25/16',
        'eventTitle': 'Business Meeting',
        'eventDesc': 'Meeting with John Doe for stuff.'
      },
      {
        'eventDate': '10/25/16',
        'eventTitle': 'Business Meeting',
        'eventDesc': 'Meeting with John Doe for stuff.'
      }
    ]
  }

  res.render('index', data);
};
