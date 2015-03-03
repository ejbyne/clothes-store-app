var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var ProductDB = require('./app/models/productDB.js');
var ShoppingCart = require('./app/models/shoppingCart.js');
var productDB = new ProductDB();
var shoppingCart = new ShoppingCart();

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/app/views/index.html')
});

server.listen(port, function(){
  console.log('Server listening on port ' + port);
});

module.exports = server;
