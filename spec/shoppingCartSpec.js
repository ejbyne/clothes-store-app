var ShoppingCart = require('../app/models/shoppingCart.js');
var ProductDB = require('../app/models/ProductDB.js');

describe('ShoppingCart', function() {

  var shoppingCart, Product, product1, product2;

  beforeEach(function() {
    shoppingCart = new ShoppingCart();
    Product = new ProductDB();
    product1 = Product.findById(1);
    product2 = Product.findById(2);
  });

  it('starts with an empty shopping cart', function() {
    expect(shoppingCart.items.length).toEqual(0);
  });

  it('enables an item to be added to the shopping cart', function() {
    shoppingCart.addItem(product1);
    expect(shoppingCart.items.length).toEqual(1);
  });

  it('enables an item to be removed from the shopping cart', function() {
    shoppingCart.addItem(product1);
    shoppingCart.addItem(product2);
    expect(shoppingCart.items.length).toEqual(2);
    shoppingCart.removeItem(product1);
    expect(shoppingCart.items.length).toEqual(1);
    expect(shoppingCart.items[0]).toBe(product2);
  });

  it('keeps a running total of the price of the items in the shopping card', function() {
    shoppingCart.addItem(product1);
    expect(shoppingCart.totalPrice()).toEqual(99);
    shoppingCart.addItem(product2);
    expect(shoppingCart.totalPrice()).toEqual(141);
  });

  it('allows a £5 discount if the correct voucher code is entered', function() {
    shoppingCart.addItem(product1);
    shoppingCart.applyFiverDiscount('FIVERDISCOUNT');
    expect(shoppingCart.totalPrice()).toEqual(94);
  });

});