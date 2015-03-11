angular.module('storeController', [])

.controller('storeController', function(Product, Cart) {

  var store = this;
  store.products = [];
  store.cart = {
    items: []
  };
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

  store.getCart = function() {
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

  store.removeFromCart = function(id, quantity) {
    Cart.remove(id, quantity)
    .success(function(data) {
      store.getCart();
      store.message = data.message;
    });
  };

  store.isCartEmpty = function() {
    if (store.cart.items.length === 0) {
      return true;
    }
    return false;
  };

  store.applyVoucherDiscount = function() {
    Cart.requestDiscount(store.voucherCode)
    .success(function(data) {
      store.getCart();
      store.message = data.message;
      store.voucherCode = '';
      $('#voucher-modal').modal('show');
    })
    .error(function(error) {
      store.message = error.message;
      store.voucherCode = '';
      $('#voucher-modal').modal('show');
    });
  };

  store.isVoucherDiscount = function() {
    return store.cart.voucherDiscount > 0;
  };

  store.isSpendDiscount = function() {
    return store.cart.spendDiscount > 0;
  };

});
