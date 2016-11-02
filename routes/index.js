
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index',  {"data":[
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
  ]});
};
