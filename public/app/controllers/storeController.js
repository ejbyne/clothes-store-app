angular.module('storeController', [])

.controller('storeController', function(Product, Cart) {

  var store = this;
  store.products = [];
  store.cart = {
    items: []
  };
  store.orderQuantity = {};
  store.newQuantity = {};
  store.selectedFilter = {};
  store.filterOptions = {
    ALL: {},
    M1:  { supercategory: 'Men\'s' },
    M2:  { category:      'Men\'s Footwear' },
    M3:  { category:      'Men\'s Casualwear' },
    M4:  { category:      'Men\'s Formalwear' },
    W1:  { supercategory: 'Women\'s' },
    W2:  { category:      'Women\'s Footwear' },
    W3:  { category:      'Women\'s Casualwear' },
    W4:  { category:      'Women\'s Formalwear' }
  };

  store.findProducts = function() {
    Product.all()
    .success(function(data) {
      store.products = data.products;
    });
  };

  store.getCart = function() {
    Cart.get()
    .success(function(data) {
      store.cart = data.cart;
    });
  };

  store.addToCart = function(id) {
    Cart.add(id, store.orderQuantity[id])
    .success(function(data) {
      store.updateData(data.message);
      store.cartMessage(id);
    })
    .error(function(error) {
      store.updateData(error.message);
      store.cartMessage(id);
    });
  };

  store.removeFromCart = function(id, quantity) {
    Cart.remove(id, quantity)
    .success(function(data) {
      store.updateData(data.message);
    });
  };

  store.amendItemQuantity = function(id, quantity) {
    Cart.amend(id, quantity, store.newQuantity[id])
    .success(function(data) {
      store.updateData(data.message);
    })
    .error(function(error) {
      store.updateData(error.message);
      store.newQuantity[id] = quantity;
      store.cartMessage(id);
    });
  };

  store.applyVoucherDiscount = function() {
    Cart.requestDiscount(store.voucherCode)
    .success(function(data) {
      store.voucherMessage();
      store.updateData(data.message);
    })
    .error(function(error) {
      store.voucherMessage();
      store.updateData(error.message);
    });
  };

  store.updateData = function(message) {
    store.message = message;
    store.getCart();
    store.findProducts();
  };

  store.isCartEmpty = function() {
    if (store.cart.items.length === 0) {
      return true;
    }
    return false;
  };

  store.isVoucherDiscount = function() {
    return store.cart.voucherDiscount > 0;
  };

  store.isSpendDiscount = function() {
    return store.cart.spendDiscount > 0;
  };

  store.filterProducts = function(filterCode) {
    store.selectedFilter = store.filterOptions[filterCode];
  };

  store.cartMessage = function(id) {
    store.orderQuantity[id] = 1;
    $('#cart-modal').modal('show');
  };

  store.voucherMessage = function() {
    store.voucherCode = '';
    $('#voucher-modal').modal('show');
  };

  store.findProducts();
  store.getCart();

});
