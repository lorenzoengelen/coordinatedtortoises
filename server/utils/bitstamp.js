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

console.log('listening to new trades..');
ws.on('trade', function(trade) {
  console.log(trade);
});

server.newConnection(function(ws) {
  console.log('Bitstamp is up');
});

// { buy_order_id: 151096310,
//   timestamp: '1473899006',
//   price: 607.09,
//   amount: 0.011, // Trade amount.
//   sell_order_id: 151096319,
//   type: 1, // Trade type (0 - buy; 1 - sell).
//   id: 12037426 }