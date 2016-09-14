var skt = require('../workers/bcSocket.js');
var server = require('../workers/serverSocket.js');

var gdax = {
  uri: 'wss://ws-feed.gdax.com',
  options: {'type': 'subscribe', 'product_id': 'BTC-USD'}
};

// create a new blockchain websocket
var ws = new skt.ws(gdax.uri);

// subscribe to new transactions
ws.open(gdax.options, function() {
  console.log(ws.state() + ' to gdax socket and subscribing to new transactions');
});

ws.getData(function(data, flags) {

  var dat = JSON.parse(data);
  console.log(data);

  //server.broadcast(JSON.stringify(transaction));
});

ws.onClose(function() {
  console.log(ws.state());
});

server.newConnection(function(ws) {
  console.log('New Connection');
});

