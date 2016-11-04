var fs = require('fs');
exports.view = function(req, res){
  var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var userInfo = data['userInfo'];
  console.log(userInfo);
  res.render('accountPage', userInfo);
};
