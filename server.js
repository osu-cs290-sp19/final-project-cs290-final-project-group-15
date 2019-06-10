var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

var port = process.env.PORT || 3002;


var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;


app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

//##############################################################

app.post('/addBill', function (req, res, next) {
  if (req.body && req.body.url && req.body.caption) {
    var collection = db.collection('bills');
    var bill = {
      description: req.body.description,
      amount: req.body.amount
    };
    collection.insertOne(bill, function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Error inserting photo into DB"
          });
        } else {
          console.log("== insert result:", result);
          res.status(200).send("Success");
        }
      }
    );
  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});

app.post('/addPerson', function (req, res, next) {
  if (req.body && req.body.url && req.body.caption) {
    var collection = db.collection('people');
    var person = {
      name: req.body.name,
      owe: req.body.owe
    };
    collection.insertOne(person, function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Error inserting photo into DB"
          });
        } else {
          console.log("== insert result:", result);
          res.status(200).send("Success");
        }
      }
    );
  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});

//##############################################################


app.get('/yourpage', function(req, res, next) {
  console.log('--res: ' + res);
  console.log('--req: ' + req);
  res.status(200).sendFile(__dirname + '/public/yourpage.html');
});

//GOES LAST
app.get('*', function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});


MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
