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

  return cartFactory;

});
