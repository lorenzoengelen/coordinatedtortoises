// PARIS
var server = require('../workers/serverSocket.js');
var io = require('socket.io-client');

var socket = io.connect('paymium.com/public', {
  path: '/ws/socket.io'
});

socket.on('connect', function() {
  console.log('CONNECTING to paymium socket and subscribing to new transactions');
});

socket.on('stream', function(publicData) {
  // console.log(publicData.ticker);
  console.log(publicData.trades);
  // console.log(publicData.bids);
  // console.log(publicData.asks);
});

server.newConnection(function(ws) {
  console.log('Paymium is up');
});

socket.on('disconnect', function() {
  console.log('DISCONNECTED');
});

// {
//   trades: [
//     {
//       price: 275,
//       traded_btc: 0.03636363,
//       timestamp: 1446464202000,
//       currency: 'EUR'
//     }
//   ]
// }