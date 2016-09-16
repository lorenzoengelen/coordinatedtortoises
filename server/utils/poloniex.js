// DELAWARE
var server = require('../workers/serverSocket.js');
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});

var newStream = function(data) {
  data.forEach(function(element) {
    if (element.type === 'newTrade') {
    	return {
        name: 'poloniex',
        amount: element.data.amount,
        lat: 39.7299628,
        lon: -75.5645898,
        time: element.data.date
    	};
    }
  });
};

connection.onopen = function (session) {
	var marketEvent = function(args, kwargs) {
	  var stream = newStream(args);
	  if (stream) {
		  server.broadcast(JSON.stringify(stream));
	  }
	}
	session.subscribe('USDT_BTC', marketEvent);
}
                       
connection.open();

server.newConnection(function(ws) {
});