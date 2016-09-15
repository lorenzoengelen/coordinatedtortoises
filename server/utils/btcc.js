// CHINA
var server = require('../workers/serverSocket.js');
var io = require('socket.io-client');
var socket = io('https://websocket.btcc.com/');

var newSteam = function(data) {
  return {
    name: 'btcc',
    amount: data.amount,
    lat: 31.1829161,
    lon: 121.4351279,
    time: data.date 
  };
};

socket.emit('subscribe', ['marketdata_cnybtc']);
socket.on('trade', function(data) { 
	var stream = newSteam(data);
	server.broadcast(JSON.stringify(stream));
});