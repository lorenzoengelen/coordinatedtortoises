var WebSocket = require('ws');
var events = require('events');

// creates a new class called BitCoinWebSocket
var BitCoinWebSocket = function(url) {
  WebSocket.call(this, url);

  this._states = {
    1: 'CONNECTING',
    2: 'OPEN',
    3: 'CLOSING',
    4: 'CLOSED'
  };

  // call 'on' method on the WebSocket prototype
  this._on = function(msg, args) {
    WebSocket.prototype.on.call(this, msg, args);
  };
};

BitCoinWebSocket.prototype = Object.create(WebSocket.prototype);
BitCoinWebSocket.prototype.constructor = BitCoinWebSocket;

// check BitCoinWebSocket state
BitCoinWebSocket.prototype.state = function() {
  return this._states[this.readyState];
};

// open websocket connection
BitCoinWebSocket.prototype.open = function(options, cb) {
  options = options || {};
  // call send method on prototype
  this._on('open', function() {
    this.send(JSON.stringify(options), {masked: true}, cb);
  });
};

// close websocket connection
BitCoinWebSocket.prototype.close = function(code, data) {
  WebSocket.prototype.close.call(this, code, data);
};

// receiving data from the socket
BitCoinWebSocket.prototype.getData = function(cb) {
  this._on('message', function(data, flags) {
    cb(data, flags);
  });
};

// execute callback if connection opens
BitCoinWebSocket.prototype.onOpen = function(cb) {
  this._on('open', cb);
};

// execute callback if connection closes
BitCoinWebSocket.prototype.onClose = function(cb) {
  this._on('close', cb);
};

// execute callback if error occurs
BitCoinWebSocket.prototype.onError = function(cb) {
  this._on('error', cb);
};

// sending data to socket
BitCoinWebSocket.prototype.send = function(data, options, cb) {
  options = options || {};
  WebSocket.prototype.send.call(this, data, options, cb);
};

module.exports = {
  ws: BitCoinWebSocket
};

