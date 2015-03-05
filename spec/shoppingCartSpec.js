var ShoppingCart = require('../app/models/shoppingCart.js');
var ProductDB = require('../app/models/ProductDB.js');

describe('ShoppingCart', function() {

  var shoppingCart, Product, product1, product2;

  beforeEach(function() {
    shoppingCart = new ShoppingCart();
    productDB = new ProductDB();
    server = jasmine.createSpyObj('server', ['callback']);
    product1 = productDB.findById(1, server.callback);
    product2 = productDB.findById(2, server.callback);
  });

  describe('adding and removing items', function() {

    it('the shopping cart is empty at the outset', function() {
      expect(shoppingCart.items.length).toEqual(0);
    });

    it('allows an in-stock item to be added', function() {
      shoppingCart.addItem(product1);
      expect(shoppingCart.items.length).toEqual(1);
    });

    it('does not allow an out-of-stock item to be added', function() {
      expect(function() { shoppingCart.addItem(productDB.findById(5, server.callback)); })
      .toThrow('Item out of stock');
    });

    it('allows an item to be removed', function() {
      shoppingCart.addItem(product1);
      shoppingCart.addItem(product2);
      expect(shoppingCart.items.length).toEqual(2);
      shoppingCart.removeItem(product1);
      expect(shoppingCart.items.length).toEqual(1);
      expect(shoppingCart.items[0]).toBe(product2);
    });

  });

  describe('total price', function() {

    it('keeps a running total', function() {
      expect(shoppingCart.totalPrice()).toEqual(0);
      shoppingCart.addItem(productDB.findById(4, server.callback));
      expect(shoppingCart.totalPrice()).toEqual(19);
      shoppingCart.addItem(productDB.findById(7, server.callback));
      expect(shoppingCart.totalPrice()).toEqual(49);
    });

  });

  describe('applying discounts', function() {

    it('allows a £5 discount if the correct voucher code is entered', function() {
      shoppingCart.addItem(product2);
      shoppingCart.applyDiscountVoucher('FIVERDISCOUNT');
      expect(shoppingCart.totalPrice()).toEqual(37);
    });

    it('will raise an error if an incorrect voucher code is entered', function() {
      shoppingCart.addItem(product2);
      expect(function() { shoppingCart.applyDiscountVoucher('TENNERDISCOUNT'); })
      .toThrow('Invalid voucher code');
      expect(shoppingCart.totalPrice()).toEqual(42);
    });

    it('allows a £10 discount if the total is over £50', function() {
      shoppingCart.addItem(productDB.findById(3, server.callback));
      shoppingCart.addItem(productDB.findById(4, server.callback));
      expect(shoppingCart.totalPrice()).toEqual(43);
    });

    it('allows a £15 discount if the total is over £75 and there is a footwear item', function() {
      shoppingCart.addItem(product1);
      expect(shoppingCart.totalPrice()).toEqual(84);
    });

  });

});