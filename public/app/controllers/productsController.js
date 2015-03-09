var clothesShopApp = angular.module('clothesShopApp', ['productService']);

clothesShopApp.controller('productsController', function(Product) {

  var products = this;

  Product.all()
  .success(function(data) {
    products.productList = data.products;
  });

  products.findProducts = function() {
    Product.all()
    .success(function(data) {
      products.productList = data.products;
    });
  };

  products.findProductById = function(id) {
    Product.get(id)
    .success(function(data) {
      console.log(data.product);
      return data.product;
    });
  };

});
