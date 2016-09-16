// LONDON
var server = require('../workers/serverSocket.js');
var Bitstamp = require('bitstamp-ws');

var ws = new Bitstamp({
  // force encrypted socket session
  encrypted: true,
  // BTC/USD market:
  live_trades: true,
  // BTC/EUR market:
  live_trades_btceur: true
});

var newStream = function(data) {
  return {
  	name: 'bitstamp',
  	amount: data.amount,
  	lat: 51.5156993,
  	lon: -0.1095603,
  	time: data.timestamp
  }
};

ws.on('trade', function(trade) {
  var stream = newStream(trade);
  server.broadcast(JSON.stringify(stream));
});

server.newConnection(function(ws) {
});