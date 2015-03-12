angular.module('productService', [])

.factory('Product', function($http) {

  var productFactory = {};

  productFactory.all = function() {
    return $http.get('/products');
  };

  return productFactory;

});
