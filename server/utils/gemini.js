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
  console.log('GEMINI is up');
});

// {
//     "eventId": 100,
//     "events": [
//         ...,
//         {
//             "type": "change",
//             "reason": "initial",
//             "price": "415.54",
//             "delta": "0.7",
//             "remaining": "0.7",
//             "side": "bid"
//         },
//         {
//             "type": "change",
//             "reason": "initial",
//             "price": "415.55",
//             "delta": "0.017",
//             "remaining": "0.017",
//             "side": "bid"
//         },
//         {
//             "type": "change",
//             "reason": "initial",
//             "price": "415.57",
//             "delta": "19.44458",
//             "remaining": "19.44458",
//             "side": "ask"
//         },
//         {
//             "type": "change",
//             "reason": "initial",
//             "price": "415.58",
//             "delta": "9.68",
//             "remaining": "9.68",
//             "side": "ask"
//         },
//         ...
//     ]
// }