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
  console.log('GDAX is up');
});

//  {
// 	"type":"received",
// 	"sequence":1513572974,
// 	"order_id":"3e049269-f51e-4947-9676-96e87e36a430",
// 	"order_type":"limit",
// 	"size":"0.03",
// 	"price":"607.68","side":"sell","funds":null,"product_id":"BTC-USD","time":"2016-09-15T21:31:36.060129Z"}
// {"type":"open","sequence":1513572975,"side":"sell","price":"607.68","order_id":"3e049269-f51e-4947-9676-96e87e36a430","remaining_size":"0.03","product_id":"BTC-USD","time":"2016-09-15T21:31:36.060534Z"}
// {"type":"done","order_type":"limit","side":"sell","sequence":1513572976,"order_id":"cd3e6811-febc-4baf-b8e6-23452d6f60bb","reason":"canceled","product_id":"BTC-USD","time":"2016-09-15T21:31:36.24422Z","price":"621.28","remaining_size":"0.26"}