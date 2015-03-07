var ShoppingCart = require('../../app/models/shoppingCart.js');
var ProductDB = require('../../app/models/ProductDB.js');

describe('ShoppingCart', function() {

  var shoppingCart, Product, product1, product2;

  beforeEach(function() {
    shoppingCart = new ShoppingCart();
    productDB = new ProductDB();
    server = jasmine.createSpyObj('server', ['callback']);
    product1 = productDB.findById(1, server.callback);
    product2 = productDB.findById(2, server.callback);
  });

  describe('adding items', function() {

    it('the shopping cart is empty at the outset', function() {
      expect(shoppingCart.items.length).toEqual(0);
    });

    it('allows an item to be added if there is sufficient stock', function() {
      shoppingCart.addItem(product1, 1);
      expect(shoppingCart.items.length).toEqual(1);
    });

    it('allows a quantity of more than one to be added', function() {
      shoppingCart.addItem(product1, 2);
      expect(shoppingCart.items[0].quantity).toEqual(2);
      shoppingCart.addItem(product2, 1);
      shoppingCart.addItem(product2, 1);
      expect(shoppingCart.items[1].quantity).toEqual(2);
    });

    it('does not allow an item to be added if there is insufficient stock', function() {
      expect(function() { shoppingCart.addItem(productDB.findById(5, server.callback), 1); })
      .toThrow('Insufficient stock');
    });

  });

  describe('removing items', function() {

    it('allows an item to be removed', function() {
      shoppingCart.addItem(product1, 1);
      shoppingCart.addItem(product2, 1);
      expect(shoppingCart.items.length).toEqual(2);
      shoppingCart.removeItem(product1);
      expect(shoppingCart.items.length).toEqual(1);
      expect(shoppingCart.items[0].name).toEqual('Suede Shoes, Blue');
    });

    it('allows a quantity of more than one to be removed', function() {
      shoppingCart.addItem(product1, 5);
      expect(shoppingCart.items[0].quantity).toEqual(5);
      shoppingCart.removeItem(product1, 3);
      expect(shoppingCart.items[0].quantity).toEqual(2);
      shoppingCart.removeItem(product1, 2);
      expect(shoppingCart.items.length).toEqual(0);
    });

    it('does not allow an item to be removed if the quantity is invalid', function() {
      shoppingCart.addItem(product1, 1);
      expect(function() { shoppingCart.removeItem(productDB.findById(1, server.callback), 2); })
      .toThrow('Invalid quantity');      
    });

  });

  describe('total price', function() {

    it('keeps a running total', function() {
      expect(shoppingCart.totalPrice()).toEqual(0);
      shoppingCart.addItem(productDB.findById(4, server.callback), 1);
      expect(shoppingCart.totalPrice()).toEqual(19);
      shoppingCart.addItem(productDB.findById(7, server.callback), 1);
      expect(shoppingCart.totalPrice()).toEqual(49);
    });

  });

  describe('applying discounts', function() {

    it('allows a £5 discount if the correct voucher code is entered', function() {
      shoppingCart.addItem(product2, 1);
      shoppingCart.applyDiscountVoucher('FIVERDISCOUNT');
      expect(shoppingCart.totalPrice()).toEqual(37);
    });

    it('will raise an error if an incorrect voucher code is entered', function() {
      shoppingCart.addItem(product2, 1);
      expect(function() { shoppingCart.applyDiscountVoucher('TENNERDISCOUNT'); })
      .toThrow('Invalid voucher code');
      expect(shoppingCart.totalPrice()).toEqual(42);
    });

    it('allows a £10 discount if the total is over £50', function() {
      shoppingCart.addItem(productDB.findById(3, server.callback), 1);
      shoppingCart.addItem(productDB.findById(4, server.callback), 1);
      expect(shoppingCart.totalPrice()).toEqual(43);
    });

    it('allows a £15 discount if the total is over £75 and there is a footwear item', function() {
      shoppingCart.addItem(product1, 1);
      expect(shoppingCart.totalPrice()).toEqual(84);
    });

  });

});
