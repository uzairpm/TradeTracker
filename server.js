var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var xmlFetcher = require("./server/fetchXML");

var products = [];
var dataURL = "";

server.listen(80, function () {
  console.log('Server started. Please navigate to localhost on your browser');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/dist/index.html');
});

//express middleware to serve static files
app.use(express.static('dist'));

io.on('connection', function (socket) {
  console.log("Websockets ready!");
  socket.emit('hello', { msg: 'Request for URL' });
  var counter = 0;

  socket.on('url', function (data) {
    console.log("URL received from front end");
    dataURL = data.url;

    xmlFetcher.fetch(dataURL, function(data) {
      if(data === 'Error') {
        socket.emit('error', 'No products found. Please try another URL.');
      } else {
        //console.log("XML fetched for the given URL");
        var t = setInterval(function() {
          //console.log("Sending json "+counter);
          if(data[counter] !== null) {

            socket.emit('productParsed', {
              productData: data[counter]
            });
          }
          counter++;

          if(counter > (data.length-1)) {
            clearInterval(t);
          }
          //to simulate chunked xml parsing
          //send json for every 1 second
        }, 1000);
      }
    });
  });
});
