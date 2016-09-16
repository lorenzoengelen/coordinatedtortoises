// HONG KONG
var skt = require('../workers/bcSocket.js');
var server = require('../workers/serverSocket.js');

var bitfinex = {
  uri: 'wss://api2.bitfinex.com:3000/ws',
  options: {
  	'event': 'subscribe',
    'channel': 'trades',
    'pair': 'BTCUSD'
  }
};

// create a new blockchain websocket
var ws = new skt.ws(bitfinex.uri);

// subscribe to new transactions
ws.open(bitfinex.options, function() {
  console.log(ws.state() + ' to gdax socket and subscribing to new transactions');
});

ws.getData(function(data, flags) {
  var data = JSON.parse(data);
});

ws.onClose(function() {
  console.log(ws.state());
});

server.newConnection(function(ws) {
  console.log('GDAX is up');
});