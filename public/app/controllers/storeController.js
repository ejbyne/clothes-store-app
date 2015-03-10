var clothesShopApp = angular.module('clothesShopApp', ['productService', 'cartService']);

clothesShopApp.controller('storeController', function(Product, Cart) {

  var store = this;
  store.products = [];
  store.cartItem = {};

  Product.all()
  .success(function(data) {
    store.products = data.products;
  });

  store.findProducts = function() {
    Product.all()
    .success(function(data) {
      store.products = data.products;
    });
  };

  store.findProductById = function(id) {
    store.selectedProduct = false;
    Product.get(id)
    .success(function(data) {
      store.selectedProduct = data.product;
    });
  };

  store.viewCart = function() {
    store.cart = false;
    Cart.get()
    .success(function(data) {
      store.cart = data.cart;
    });
  };

  store.addToCart = function(id, quantity) {
    store.message = false;
    Cart.add(id, quantity)
    .success(function(data) {
      store.message = data.message;
      store.cartItem = {};
    });
  };

});
