const MongoClient = require("mongodb").MongoClient;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var us;
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('login');
});
app.get('/result', function(req, res) {
  res.redirect('/');
});
app.post('/result', urlencodedParser, function(req, res) {
  var rr = new Array();
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
  mongoClient.connect(function(err, client) {
    if (err) {
        return console.log(err);
    }
    const db = client.db("qw");
    const collection = db.collection("qw");
    const coll = db.collection("results");
    collection.find().toArray(function(err, resul) {
      for (var i = 0; i < resul.length; i++) {
        for (var j = 0; j < resul[i].answers.length; j++) {
          if (resul[i].answers[j].answer == req.body.check[i]) {
            rr.push(resul[i].answers[j].correct);
          }
        }
      }
      var res_us = {name: us.name, result: rr};
      coll.insertOne(res_us, function(err, resul) {
        coll.find({name: us.name}).toArray(function(err, re) {
          res.render('result', {data: re});
          client.close();
        });
      });
    });
  });
});
app.post('/', urlencodedParser, function(req, res) {
  if (req.body.name == "") {
    res.render('login');
  } else if (req.body.pass == "") {
    res.render('login');
  } else {
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
    mongoClient.connect(function(err, client) {
      if (err) {
          return console.log(err);
      }
      const db = client.db("qw");
      const collection = db.collection("qw");
      const coll = db.collection("user");
      var log = false;
      var pass = false;
      coll.find().toArray(function(err, ress) {
        for (var i = 0; i < (ress.length) && (!log); i++) {
          if (req.body.name == ress[i].name) {
            log = true;
            if (req.body.pass == ress[i].pass) {
              pass = true;
            }
          }
        }
        if (!log) {
          us = {name: req.body.name, pass: req.body.pass};
          coll.insertOne(us, function(err, resul) {
            var tes;
            var l2 = new Array();
            collection.find().toArray(function(err, results) {
              tes = results;
              for (var i = 0; i < tes.length; i++) {
                l2.push(tes[i].answers.length);
              }
              res.render('test', {qw: tes, l1: tes.length, l2: l2});
              client.close();
            });
          });
        } else if (!pass) {
          res.render('login');
        } else {
          us = {name: req.body.name, pass: req.body.pass};
          var tes;
          var l2 = new Array();
          collection.find().toArray(function(err, results) {
            tes = results;
            for (var i = 0; i < tes.length; i++) {
              l2.push(tes[i].answers.length);
            }
            res.render('test', {qw: tes, l1: tes.length, l2: l2});
            client.close();
        });
      }
      });
    });
  }
});
app.listen(3000);
