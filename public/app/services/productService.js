angular.module('productService', [])

.factory('Product', function($http) {

  var productFactory = {};

  productFactory.all = function() {
    return $http.get('/products');
  };

  productFactory.get = function(id) {
    return $http.get('/products/' + id);
  };

  return productFactory;

});
