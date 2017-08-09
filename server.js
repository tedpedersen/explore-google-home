//Imports
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var routes = require('./api/routes/apiroutes');

require('@google-cloud/debug-agent').start();

const express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

//Express configuration
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);


// Start the server
if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
