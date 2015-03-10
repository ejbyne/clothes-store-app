angular.module('cartService', [])

.factory('Cart', function($http) {

  var cartFactory = {};

  cartFactory.get = function() {
    return $http.get('/cart');
  };

  cartFactory.add = function(id, quantity) {
    return $http.post('/cart/add', { id: id, quantity: quantity });
  };

  return cartFactory;

});