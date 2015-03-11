angular.module('storeController', [])

.controller('storeController', function(Product, Cart) {

  var store = this;
  store.products = [];
  store.orderQuantities = {};

  Product.all()
  .success(function(data) {
    store.products = data.products;
    store.products.forEach(function(product) {
      store.orderQuantities[product.id] = 1;
    });
  });

  Cart.get()
  .success(function(data) {
    store.cart = data.cart;
  });

  store.findProducts = function() {
    Product.all()
    .success(function(data) {
      store.products = data.products;
    });
  };

  store.findProductById = function(id) {
    Product.get(id)
    .success(function(data) {
      store.selectedProduct = data.product;
    });
  };

  store.viewCart = function() {
    Cart.get()
    .success(function(data) {
      store.cart = data.cart;
    });
  };

  store.addToCart = function(id) {
    Cart.add(id, store.orderQuantities[id])
    .success(function(data) {
      store.orderQuantities[id] = 1;
      store.findProducts();
      store.message = data.message;
      $('#cart-modal').modal('show');
    });
  };

});
