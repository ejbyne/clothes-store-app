var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;
var ProductDB = require('./app/models/productDB');
var ShoppingCart = require('./app/models/shoppingCart');
var productDB = new ProductDB();
var shoppingCart = new ShoppingCart();
var productsRoutes = require('./app/routes/products')(app, express, productDB);
var cartRoutes = require('./app/routes/cart')(app, express, productDB, shoppingCart);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});

server.listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = server;
