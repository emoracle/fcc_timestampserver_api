'use strict';

var 
moment = require("moment"),
express = require("express"),
path = require("path"),
app = express(),
port = process.env.PORT || 8080;

app.get('/timestampserver/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/timestampserver/:time', function(req,res){
    var 
    unixDate = null,
    naturalDate = null;
    
    if (!isNaN(req.params.time) && moment(req.params.time, "X").isValid()) {
      unixDate = req.params.time;
      naturalDate = moment(unixDate, "X").format("MMMM DD, YYYY");
    } else {
      unixDate = moment(req.params.time, "MMMM DD, YYYY").format("X");
      naturalDate = moment(unixDate, "X").format("MMMM DD, YYYY");
    }
  if (unixDate.toString() === "Invalid date") {
    unixDate = null;
    naturalDate = null;
  }
   res.send(JSON.stringify({unix: unixDate, natural: naturalDate}));
 
});

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});