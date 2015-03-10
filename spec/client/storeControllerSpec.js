describe('Store Controller', function(){

  var store, httpBackend;
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
    store = $controller('storeController');
    httpBackend = $httpBackend;
    httpBackend
      .when('GET', '/products')
      .respond({ products: mockProducts });
    httpBackend
      .when('GET', '/products/1')
      .respond({ product: mockProducts[0] });
    httpBackend
      .when('POST', '/cart/add', { id: 1, quantity: 2 })
      .respond({ success: true, message: 'Item successfully added to cart' });
    httpBackend
      .when('GET', '/cart')
      .respond( {cart: {items:[], sumOfItemPrices: 0, voucherDiscount: 0,
        spendDiscount: 0, totalDiscounts: 0, totalPrice: 0 }});
  }));

  it('should retrieve all products', function() {
    httpBackend.flush();
    expect(store.products.length).toBe(3);
    expect(store.products[0]).toEqual(mockProducts[0]);
    expect(store.products[2]).toEqual(mockProducts[2]);
  });

  it('should retrieve a requested product', function() {
    store.findProductById(1);
    expect(store.selectedProduct).toBe(false);
    httpBackend.flush();
    expect(store.selectedProduct).toEqual(mockProducts[0]);
  });

  it('should retrieve the contents of the cart', function() {
    store.viewCart();
    expect(store.cart).toBe(false);
    httpBackend.flush();
    expect(store.cart).toEqual({items:[], sumOfItemPrices: 0,
      voucherDiscount: 0, spendDiscount: 0, totalDiscounts: 0, totalPrice: 0});
  });

  it('should enable an item to be added to the cart', function() {
    store.orderQuantities[1] = 2;
    store.addToCart(1);
    expect(store.message).toBe(false);
    httpBackend.flush();
    expect(store.message).toBe('Item successfully added to cart');
  });

});
