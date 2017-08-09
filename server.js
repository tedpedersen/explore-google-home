//Imports
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var routes = require('./api/routes/apiroutes');

//SSL key
var options = {
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem')
};

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

//Express configuration 
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

//Sample URL
//HTTPS : https://10.149.251.186:8443/tasks
//HTTP : http://10.149.251.186:8080/tasks

httpServer.listen(8080);
httpsServer.listen(8443);
console.log("Listening in following ports 8080, 8443");