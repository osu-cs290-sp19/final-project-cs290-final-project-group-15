var http = require('http');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());


var port = process.env.PORT || 3004;

//in theory these should be set as env vars but export isn't working bc flip isn't bash/....
var mongoHost = "classmongo.engr.oregonstate.edu"; //= process.env.MONGO_HOST;
var mongoPort = 27017; //process.env.MONGO_PORT || 27017;
var mongoUser = "cs290_litzingj"; //process.env.MONGO_USER;
var mongoPassword = "cs290_litzingj"; //process.env.MONGO_PASSWORD;
var mongoDBName = "cs290_litzingj"; //process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;


app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

//##############################################################

app.post('/addBill', function (req, res, next) {
  console.log("/addBill");
  console.log("req.body.description: " + req.body.description);
  if (req.body && req.body.description && req.body.amount && req.body.split) {
    console.log("if is true");
    var collection = db.collection('bills');
    var bill = {
      description: req.body.description,
      amount: req.body.amount,
      split: req.body.split
    };
    console.log("bill: " + bill);
    collection.insertOne({
      description: req.body.description,
      amount: req.body.amount,
      split: req.body.split
    }, function (err, result) {
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
    console.log("bills collection: " + collection);
  } else {
    res.status(400).send("Request needs a body with a description and amount");
  }
});

app.post('/addPerson', function (req, res, next) {
    console.log("/addPerson");
    console.log(req.body);

  if (req.body && req.body.name && req.body.owe == 0) {
    var collection = db.collection('people');
    var person = {
      name: req.body.name,
      owe: req.body.owe
    };
    console.log("person: " + person);
    collection.insertOne({
      name: req.body.name,
      owe: req.body.owe
    }, function (err, result) {
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
    res.status(400).send("Request needs a body with a name and amount owed");
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
