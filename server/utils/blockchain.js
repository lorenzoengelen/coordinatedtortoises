var skt = require('../workers/bcSocket.js');
var server = require('../workers/serverSocket.js');
var geo = require('geo-from-ip');

var blockchain = {
  uri: 'wss://ws.blockchain.info/inv',
  options: {'op': 'unconfirmed_sub'}
};

// create a new blockchain websocket
var ws = new skt.ws(blockchain.uri);

// transform data from blockchain
var newStream = function(transaction) {
  var result = {};
  result.name = 'blockchain';
  result.amount = 0;
  
  var loc = geo.allData(transaction.relayed_by).location;
  if (loc !== undefined) {
    result.lat = loc.latitude;
    result.lon = loc.longitude;
  }

  transaction.out.forEach(function(sent) {
    result.amount += sent.value / 100000000;
  });

  result.time = transaction.time * 1000
  return result;
};

// subscribe to new transactions
ws.open(blockchain.options, function() {
  console.log(ws.state() + ' to blockchain socket and subscribing to new transactions');
});

ws.getData(function(data, flags) {
  // data we want
  var transaction = newStream(JSON.parse(data).x);
  // broadcast with server socket
  if (transaction.lat && transaction.lon) {
    server.broadcast(JSON.stringify(transaction));
  }
});

server.newConnection(function(ws) {
  console.log('New Connection');

  var tenMinutesAgo = Date.now() - 60 * 10 * 1000;

  // db.readHistoricalData('bitcoinData', tenMinutesAgo, function(err, results) {
  //   if (err) {
  //     console.log(err);
  //   } else if (ws.readyState === ws.OPEN) {
  //     ws.send(JSON.stringify(results));
  //   }
  //   console.log(ws.readyState);
  // });

  console.log('Blockchain is up');
});

