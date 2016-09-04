var http = require('http');
var parseString = require('xml2js').parseString;

exports.fetch = function(url, cb) {
  var req = http.get(url, function(res) {
    // save the data
    var xml = '';
    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('end', function() {
      // parse xml
      parseString(xml, function (err, result) {
        if(result.products) {
          cb(result.products.product);
        } else {
          cb("Error");
          console.log("The url returned no products.");
        }
      });
    });
  });
  req.on('error', function(err) {
    console.error("An error occured while fetching XML");
  });
}
