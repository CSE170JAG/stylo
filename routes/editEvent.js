var fs = require('fs');

exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  console.log( "HEY");
  console.log(req.body );
  var sentData = (req.body)['oldTitle'];
  console.log( sentData );

  res.render('editEvent');
};
