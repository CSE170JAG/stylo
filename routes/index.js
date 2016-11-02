
/*
 * GET home page.
 */
 //Google Calendar API
var fs = require('fs');
exports.view = function(req, res){
  res.render('index', JSON.parse(fs.readFileSync('data.json', 'utf8')));
};
