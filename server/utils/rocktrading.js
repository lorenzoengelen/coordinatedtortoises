// MALTA
var server = require('../workers/serverSocket.js');
var Pusher = require('pusher-js/node');

var pusher = new Pusher('8458eb6fbd288f0cf3d8');
var trades_channel = pusher.subscribe('currency');

var newStream = function(data) {
  if (data.symbol === 'BTCEUR') {
  	return {
      name: 'rocktrading',
      amount: data.quantity,
      lat: 35.9439061,
      lon: 14.0998386,
      time: data.time
  	};
  }
};

trades_channel.bind('last_trade', function(data) {
  var stream = newStream(data);
  if (stream) {
  	console.log(stream);
  }
});

server.newConnection(function(ws) {
  console.log('ROCKTRADING is up');
});