var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('news');
});
app.post('/', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  var users = new Object();
  res.render('test', {data: req.body});
});
app.listen(3000);
