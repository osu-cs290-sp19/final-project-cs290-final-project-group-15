var http = require('http');
var fs = require('fs');
var url = require('url');

var homepagedata = fs.readFileSync('index.html');
//var yourpagedata = fs.readFileSync('yourPage.html');
var jsdata = fs.readFileSync('index.js');
var cssdata = fs.readFileSync('style.css');
var errdata = fs.readFileSync('404.html');

function requestHandler(req, res){
  var cssdata = fs.readFileSync('style.css');
  res.setHeader('Content-Type', 'text/html');
  if(req.url === '/' || req.url === '/index.html'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(homepagedata);
  }
  else if (req.url === '/style.css'){
    res.setHeader('Content-Type', 'text/css');
    res.statusCode = 200;
    res.write(cssdata);
  }
  else if (req.url === '/index.js'){
    res.setHeader('Content-Type', 'text/js');
    res.statusCode = 200;
    res.write(jsdata);
  }
//  else if (req.url === '/yourPage.html'){
//    res.setHeader('Context-Type', 'text/html');
//    res.statusCode = 200;
//    res.write(yourpagedata);
//  }
  else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.write(errdata);
  }
  res.end();
}



var server = http.createServer(requestHandler);
server.listen(3000);
