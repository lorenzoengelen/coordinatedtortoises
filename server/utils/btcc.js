// CHINA
var server = require('../workers/serverSocket.js');
var io = require('socket.io-client');
var socket = io('https://websocket.btcc.com/');

socket.emit('subscribe', ['marketdata_cnybtc']);
socket.on('trade', function(data) { 
	// console.log(data); 
});

// { trade_id: 86074713,
//   type: 'sell',
//   price: 4032.05,
//   amount: 0.041,
//   date: 1473963084,
//   market: 'btccny' }