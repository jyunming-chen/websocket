var express = require('express')
//var ws = require('./ws')

var WebSocketServer = require('ws').Server;
var wss_draw = new WebSocketServer({port: 40610})
var wss_ipad = new WebSocketServer({port: 40510})

var ws_ipad = null, ws_draw = null;

// websocket to ipad
wss_ipad.on('connection', function (ws) {

  ws_ipad = ws;

  ws_ipad.on('message', function (message) {
	
    console.log('[ipad] received: %s', message)
    //console.log (message);
    if (ws_draw !== null) {
    	ws_draw.send (message);
    }
  });
})

wss_draw.on('connection', function (ws) {
  ws_draw = ws;
  
  ws_draw.on('message', function (message) {
    console.log('[draw] received: %s', message)
    //console.log (message);
  });
  
})

//////////////////////////////////////////////////////
var app = express()

app.get('/ipad', function (req, res) {
    res.sendFile(__dirname + '/ipad.html');
})

app.get('/draw', function (req, res) {
    res.sendFile(__dirname + '/draw0.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
