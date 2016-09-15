// DELAWARE
var server = require('../workers/serverSocket.js');
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});

connection.onopen = function (session) {
	var marketEvent = function(args, kwargs) {
	  // console.log(args);
	}
	session.subscribe('USDT_BTC', marketEvent);
}
 
connection.onclose = function () {
  console.log("Websocket connection closed");
}
                       
connection.open();

server.newConnection(function(ws) {
  console.log('POLONIEX is up');
});

// [ { type: 'orderBookModify',
//     data: { type: 'ask', rate: '0.01608000', amount: '73.09309819' } },
//   { type: 'newTrade',
//     data:
//      { amount: '3.01132825',
//        date: '2016-09-15 17:59:27',
//        rate: '0.01608000',
//        total: '0.04842215',
//        tradeID: '4921920',
//        type: 'buy' } },
//   { type: 'newTrade',
//     data:
//      { amount: '0.00757356',
//        date: '2016-09-15 17:59:27',
//        rate: '0.01608000',
//        total: '0.00012178',
//        tradeID: '4921921',
//        type: 'buy' } } ]