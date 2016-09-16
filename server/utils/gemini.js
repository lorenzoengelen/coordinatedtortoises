// NEW YORK
var WebSocket = require('ws');
var server = require('../workers/serverSocket.js');

var socket = new WebSocket('wss://api.gemini.com/v1/marketdata/btcusd');

var newStream = function(data) {
  if (data.events !== undefined) {
	  data.events.forEach(function(event) {
	    if (event.type === 'trade') {
	    	console.log(event);
	    	return {
	    		name: 'gemini',
	    		amount: event.amount,
	    		lat: 40.8130495,
	    		loc: -73.2549616,
	    		time: new Date()
	    	}
	    }
	  });
  }
};

// subscribe to new transactions
socket.onopen = function(event) {
};

socket.onmessage = function(event) {
  var message = JSON.parse(event.data)
  var stream = newStream(message);
  if (stream) {
	  server.broadcast(JSON.stringify(stream));
  }
};

server.newConnection(function(ws) {
});