var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({host: 'localhost', port: 4000});


//Broadcasts all the bitcoin data to each client
wss.broadcast = function(data) {
	console.log(data);
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};

wss.newConnection = function(cb) {
  wss.on('connection', cb);
};

module.exports = wss;

// {"bc":0.33302196,"time":1473875063000,"ip":"127.0.0.1","coords":[]}
// {"bc":0.90153479,"time":1473875063000,"ip":"46.4.132.233","coords":[51.2993,9.491]}