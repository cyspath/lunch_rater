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
//
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : ''
// });
//
// connection.query('USE lunch_rater');
//
// app.set('port', 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.get('/', function(req, res){
//   connection.query('SELECT * FROM users', function(err, rows){
//     res.render('users', {users : rows});
//   });
// });
//
// app.listen(app.get('port'));
// console.log('Express server listening on port ' + app.get('port'));
//

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

  // var urlPrefix = req.query.url.match(/.*?:\/\//g);
  // req.query.url = req.query.url.replace(/.*?:\/\//g, "");
  // var options = {
  //     hostname: req.query.url
  // };
  //
  // if(urlPrefix !== undefined && urlPrefix !== null && urlPrefix[0] === "https://") {
  //     options.port = 443;
  //     https.get(options, function(result) {
  //         processResponse(result);
  //     }).on('error', function(e) {
  //         res.send({message: e.message});
  //     });
  // } else {
  //     options.port = 80;
  //     http.get(options, function(result) {
  //         processResponse(result);
  //     }).on('error', function(e) {
  //         res.send({message: e.message});
  //     });
  // }

  var processResponse = function(result) {
      var data = "";
      result.on("data", function(chunk) {
          data += chunk;
      });
      var tags = [];
      var tagsCount = {};
      var tagsWithCount = [];
      result.on("end", function(chunk) {
          var parser = new htmlparser.Parser({
              onopentag: function(name, attribs) {
                  if(tags.indexOf(name) === -1) {
                      tags.push(name);
                      tagsCount[name] = 1;
                  } else {
                      tagsCount[name]++;
                  }
              },
              onend: function() {
                  for(var i = 0; i < tags.length; i++) {
                      tagsWithCount.push({name: tags[i], count: tagsCount[tags[i]]});
                  }
              }
          }, {decodeEntities: true});
          parser.write(data);
          parser.end();
          res.send({website: req.query.url, port: options.port, data: data, tags: tagsWithCount});
      });
  }

});

module.exports = app;
