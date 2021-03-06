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
      .when('POST', '/cart/items', { id: 1, quantity: 2 })
      .respond({ success: true, message: 'Item successfully added to cart' });
    httpBackend
      .when('POST', '/cart/items', { id: 5, quantity: 1 })
      .respond({ success: false, message: 'Insufficient stock' });
    httpBackend
      .when('GET', '/cart')
      .respond( {cart: {items:[], sumOfItemPrices: 0, voucherDiscount: 0,
        spendDiscount: 0, totalDiscounts: 0, totalPrice: 0 }});
    httpBackend
      .when('DELETE', '/cart/items/1', { quantity: 2 })
      .respond({ success: true, message: 'Item successfully removed from cart' });
    httpBackend
      .when('POST', '/cart/vouchers', { code: 'FIVERDISCOUNT' })
      .respond({ success: true, message: 'Discount successfully applied' });
    httpBackend
      .when('POST', '/cart/vouchers', { code: 'TENNERDISCOUNT' })
      .respond({ success: false, message: 'Invalid voucher code' });
    httpBackend
      .when('PUT', '/cart/items/1', { existingQuantity: 2, newQuantity: 3 })
      .respond({ success: true, message: 'Item quantity successfully amended' });
  }));

  it('should retrieve all products', function() {
    httpBackend.flush();
    expect(store.products.length).toBe(3);
    expect(store.products[0]).toEqual(mockProducts[0]);
    expect(store.products[2]).toEqual(mockProducts[2]);
  });

  it('should retrieve the contents of the cart', function() {
    store.getCart();
    expect(store.cart).toEqual({ items: [] });
    httpBackend.flush();
    expect(store.cart).toEqual({items:[], sumOfItemPrices: 0,
      voucherDiscount: 0, spendDiscount: 0, totalDiscounts: 0, totalPrice: 0});
  });

  it('should enable an item to be added to the cart', function() {
    store.orderQuantity[1] = 2;
    store.addToCart(1);
    expect(store.message).toBe(undefined);
    httpBackend.flush();
    expect(store.message).toBe('Item successfully added to cart');
  });

  it('should provide an error message when there is insufficient stock', function() {
    store.orderQuantity[5] = 1;
    store.addToCart(5);
    httpBackend.flush();
    expect(store.message).toBe('Insufficient stock');
  });

  it('should enable an item to be removed from the cart', function() {
    store.removeFromCart(1, 2);
    httpBackend.flush();
    expect(store.message).toBe('Item successfully removed from cart');
  });

  it('will provide an error message if an incorrect voucher code is supplied', function() {
    store.voucherCode = 'TENNERDISCOUNT';
    store.applyVoucherDiscount();
    httpBackend.flush();
    expect(store.isVoucherDiscount()).toBe(false);
    expect(store.message).toBe('Invalid voucher code');
  });

  it('should enable a discount to be applied with the correct code', function() {
    store.voucherCode = 'FIVERDISCOUNT';
    store.applyVoucherDiscount();
    httpBackend.flush();
    store.cart.voucherDiscount = 5;
    expect(store.isVoucherDiscount()).toBe(true);
    expect(store.message).toBe('Discount successfully applied');
  });

  it('knows if there is a spend discount', function() {
    expect(store.isSpendDiscount()).toBe(false);
    store.cart.spendDiscount = 15;
    expect(store.isSpendDiscount()).toBe(true);
  });

  it('knows when a product filter has been selected', function() {
    expect(store.selectedFilter).toEqual({});
    store.filterProducts('M2');
    expect(store.selectedFilter).toEqual({ category: 'Men\'s Footwear'} );
  });

  it('should enable an item quantity to be amended', function() {
    store.newQuantity[1] = 3;
    store.amendItemQuantity(1, 2);
    httpBackend.flush();
    expect(store.message).toBe('Item quantity successfully amended');
  });

});
