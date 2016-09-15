//
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
  var dat = JSON.parse(data);
  console.log(data);
  //server.broadcast(JSON.stringify(transaction));
});

ws.onClose(function() {
  console.log(ws.state());
});

server.newConnection(function(ws) {
  console.log('GDAX is up');
});

// [14,"te","3134357-BTCUSD",1473966624,612.69,-0.05]
// [14,"tu","3134357-BTCUSD",24022635,1473966624,612.69,-0.05]
// [14,"hb"]
// [14,"hb"]
// [14,"hb"]
// [14,"hb"]

// SEQ	string	Trade sequence id
// ID	int	Trade database id
// TIMESTAMP	int	Unix timestamp of the trade.
// PRICE	float	Price at which the trade was executed
// ±AMOUNT	float	How much was bought (positive) or sold (negative).
// The order that causes the trade determines if it is a buy or a sell.