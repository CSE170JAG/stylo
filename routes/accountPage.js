var fs = require('fs');
exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.render('accountPage', data[req.query.user]);
};
