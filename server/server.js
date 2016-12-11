(function() {
	'use strict';

	var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
	var bodyParser = require('body-parser');
	var cors = require('cors');
	var path = require('path');
	var jsonServer = require('json-server')
	var jsver = jsonServer.create()
	var router = jsonServer.router('user.json')
	var middlewares = jsonServer.defaults()
 
jsver.use(middlewares)
jsver.use(router)
jsver.listen(4000, function () {
  console.log('JSON Server is running')
})

	app.use(cors());
	app.use(bodyParser.json());
	var massage = {};
	app.use(express.static(__dirname + '/public'));
	var psocket;
	
	io.on('connection', function (socket) {
  		psocket = socket;
  	});

	app.all('/', function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		next();
 	});

 	
	app.post('/', function (req, res) {
  		var data = {
		"first" : req.body.message,
		"number" : req.body.phone
		}
  		massage = req.body;
  		console.log(massage);
  		console.log("bypassed1");
  		
  		psocket.emit('news', data);
  		psocket.on('my other event', function (data) {
   			 console.log(data);
  		});
  		console.log("bypassed2");
  		
	})


	server.listen(3000, function() {
		console.log("Server running on port 3000");
	});

		
}());
