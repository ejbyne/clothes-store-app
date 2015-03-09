describe('Products Controller', function(){

  var products, httpBackend;
  var mockProducts = [
    {
      id:       1,
      name:     "Almond Toe Court Shoes, Patent Black",
      category: "Women's Footwear",
      price:    99,
      quantity: 5
    },
    {
      id:       2,
      name:     "Suede Shoes, Blue",
      category: "Women's Footwear",
      price:    42,
      quantity: 4
    },
    {
      id:       3,
      name:     "Leather Driver Saddle Loafers, Tan",
      category: "Men's Footwear",
      price:    34,
      quantity: 12
    }
  ];

  beforeEach(module('clothesShopApp'));

  beforeEach(inject(function($controller, $httpBackend) {
    products = $controller('productsController');
    httpBackend = $httpBackend;
    httpBackend
      .when('GET', '/products')
      .respond({ products: mockProducts });
    httpBackend
      .when('GET', '/products/1')
      .respond({ product: mockProducts[0] });
  }));

  it('should create a products list with all 13 products', function() {
    httpBackend.flush();
    expect(products.productList.length).toBe(3);
    expect(products.productList[0]).toEqual({ id: 1, name: 'Almond Toe Court Shoes,' +
      ' Patent Black', category: 'Women\'s Footwear', price: 99, quantity: 5 });
    expect(products.productList[2]).toEqual({ id: 3, name: 'Leather Driver Saddle ' +
      'Loafers, Tan', category: 'Men\'s Footwear', price: 34, quantity: 12 });
  });

  it('should retrieve a requested product', function() {
    httpBackend.flush();
    products.findProductById(1, function(product) {
      expect(product).toEqual({ id: 1, name: 'Almond Toe Court Shoes,' +
        ' Patent Black', category: 'Women\'s Footwear', price: 99, quantity: 5 });
    });
  });

});
