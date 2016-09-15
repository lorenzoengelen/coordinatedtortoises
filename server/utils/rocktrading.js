// MALTA
var server = require('../workers/serverSocket.js');
var Pusher = require('pusher-js/node');

var pusher = new Pusher('8458eb6fbd288f0cf3d8');
var trades_channel = pusher.subscribe('currency');
trades_channel.bind('last_trade', function(data) {
  // console.log(data);
});

server.newConnection(function(ws) {
  console.log('ROCKTRADING is up');
});

// { symbol: 'BTCEUR',
//   quantity: 0.135,
//   value: 542.5,
//   volume: 73.23,
//   time: '2016-09-15T20:25:05+02:00',
//   diff: -0.33,
//   dark: false }

// { symbol: 'LTCBTC',
//   quantity: 0.02,
//   value: 0.00627,
//   volume: 0.0001254,
//   time: '2016-09-15T20:26:15+02:00',
//   diff: -0.48,
//   dark: false }