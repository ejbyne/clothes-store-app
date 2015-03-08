describe('Products Controller', function(){

  beforeEach(module('clothesShopApp'));

  var products;
  var productList = new ProductDB().data;

  beforeEach(inject(function($controller, $httpBackend) {
    products = $controller('ProductsController');
    httpBackend = $httpBackend
    httpBackend
      .when("GET", "/products")
      .respond({ productList: productList });
    httpBackend
      .when("GET", "/products/1")
      .respond({ selectedProduct: productList[0] });
  }));

  it('should create a productsList model with all 13 products', function() {
    expect(products.productList.length).toBe(13);
    expect(products.productList[0]).toEqual({ id: 1, name: 'Almond Toe Court Shoes,' +
      ' Patent Black', category: 'Women\'s Footwear', price: 99, quantity: 5 });
    expect(products.productList[12]).toEqual({ id: 13, name: 'Mid Twist Cut-Out Dress,' +
      ' Pink', category: 'Women\'s Formalwear', price: 540, quantity: 5 });
  });

});
