var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

var port = process.env.PORT || 3002;

app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/yourpage', function(req, res, next) {
  console.log('--res: ' + res);
  console.log('--req: ' + req);
  res.status(200).sendFile(__dirname + '/public/yourpage.html');
});

//GOES LAST
app.get('*', function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});


app.listen(port, function() {
  console.log("==Server listening on port " + port);
});
