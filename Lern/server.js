/*var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
  console.log("URL страницы: " + req.url);
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    //var myReadShort = fs.createReadStream(__dirname + '/lab1.html', 'utf8');
    //myReadShort.pipe(res);
    //res.end('Привет мир');
    var obj = {
      model: 'Audi',
      speed: '230',
      wheels: 4
    };
    res.end(JSON.stringify(obj));
  } else if (req.url === '/lab1') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    fs.createReadStream(__dirname + '/lab1.html', 'utf8').pipe(res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('404');
  }
});
server.listen(3000, '127.0.0.1');
console.log("Мы отслеживаем порт 3000");*/
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.get('/', function(req, res) {
  res.send('This is main');
});
app.get('/lab1', function(req, res) {
  res.sendFile(__dirname + "/lab1.html");
});
app.get('/news', function(req, res) {
  res.send('This is news');
});
app.get('/news/:id', function(req, res) {
  var obj = {title: "Новость", id: 4, array: ['one', 'simple', 'number: 2, 4, 6', 55]};
  res.render('news', {newsId: req.params.id, obj: obj});
});
app.listen(3000);
