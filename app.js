var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http = require("http");
var https = require("https");
var htmlparser = require("htmlparser2");

// var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');

var router = express.Router();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
// app.use('/users', users);

app.get('/', function(req, res) {

  res.render('index', {});
});

var count = 0
app.post('/rateup', function(req, res) {
  res.send(200, "rateup!");
});

app.get("/fetch", function(req, res) {

  options = {
    host: 'docs.google.com',
    path: '/spreadsheets/d/1VhHL-5Oq9Y9kceM-qcFBf-zlfdyEVvog76WFw52uBYc/pubhtml',
    method: 'GET'
  }

  https.get(options, function(result) {
      processResponse(result);
  })

  var processResponse = function(result) {
      var data = "";
      result.on("data", function(chunk) {
          data += chunk;
      });
      var tags = [];
      var tagsCount = {};
      var tagsWithCount = [];
      var rows = [];
      result.on("end", function(chunk) {
          var parser = new htmlparser.Parser({
              ontext: function(text){
                if (isNaN(text)) {
                  rows.push(text);
                  console.log(text);
                }
              }
          }, {decodeEntities: true});
          parser.write(data);
          parser.end();
          res.send({ website: req.query.url, data: data, rows: rows });
      });
  }

  var formatObj = function (rows) {
    var result = [];
    var days = ["Monday,", "Tuesday,", "Wednesday,", "Thursday"]
    var endStr = "Allergen Legend"
    for (var i = 0; i < rows.length; i++) {
      rows[i]
    }
  }

});

module.exports = app;
