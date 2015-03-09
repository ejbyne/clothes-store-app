describe('Products Controller', function(){

  var products, httpBackend;
  var productList = new ProductDB().data;

  beforeEach(module('clothesShopApp'));

  beforeEach(inject(function($controller, $httpBackend) {
    products = $controller('productsController');
    httpBackend = $httpBackend;
    httpBackend
      .when('GET', '/products')
      .respond({ products: productList });
    httpBackend
      .when('GET', '/products/1')
      .respond({ product: productList[0] });
  }));

  it('should create a products list with all 13 products', function() {
    httpBackend.flush();
    expect(products.productList.length).toBe(13);
    expect(products.productList[0]).toEqual({ id: 1, name: 'Almond Toe Court Shoes,' +
      ' Patent Black', category: 'Women\'s Footwear', price: 99, quantity: 5 });
    expect(products.productList[12]).toEqual({ id: 13, name: 'Mid Twist Cut-Out Dress,' +
      ' Pink', category: 'Women\'s Formalwear', price: 540, quantity: 5 });
  });

  it('should retrieve a requested product', function() {
    httpBackend.flush();
    products.findProductById(1, function(product) {
      expect(product).toEqual({ id: 1, name: 'Almond Toe Court Shoes,' +
        ' Patent Black', category: 'Women\'s Footwear', price: 99, quantity: 5 });
    });
  });

});
