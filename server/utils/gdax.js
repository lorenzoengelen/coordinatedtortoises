// SAN FRANCISCO
var skt = require('../workers/bcSocket.js');
var server = require('../workers/serverSocket.js');

var gdax = {
  uri: 'wss://ws-feed.gdax.com',
  options: {'type': 'subscribe', 'product_id': 'BTC-USD'}
};

// create a new blockchain websocket
var ws = new skt.ws(gdax.uri);

// transform data from blockchain
var newStream = function(data) {
	if (data.type === 'match') {
		return {
      name: 'gdax',
      amount: data.size,
      lat: 37.7900286,
      lon: -122.4030285,
      time: data.time
		};
	}
};

// subscribe to new transactions
ws.open(gdax.options, function() {
  console.log(ws.state() + ' to gdax socket and subscribing to new transactions');
});

ws.getData(function(data, flags) {
  var data = JSON.parse(data);
  var stream = newStream(data);
  if (stream) {
	  server.broadcast(JSON.stringify(stream));
  }
});

ws.onClose(function() {
  console.log(ws.state());
});

server.newConnection(function(ws) {
});