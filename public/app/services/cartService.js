angular.module('cartService', [])

.factory('Cart', function($http) {

  var cartFactory = {};

  cartFactory.get = function() {
    return $http.get('/cart');
  };

  cartFactory.add = function(id, quantity) {
    return $http.post('/cart/items', { id: id, quantity: quantity });
  };

  cartFactory.remove = function(id, quantity) {
    return $http.delete('/cart/items/' + id, { quantity: quantity });
  };

  cartFactory.amend = function(id, existingQuantity, newQuantity) {
    return $http.put('/cart/items/' + id, {
      existingQuantity: existingQuantity, newQuantity: newQuantity
    });
  };

  cartFactory.requestDiscount = function(code) {
    return $http.post('/cart/vouchers', { code: code });
  };

  return cartFactory;

});
