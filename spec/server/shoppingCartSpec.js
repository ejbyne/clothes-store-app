var ShoppingCart = require('../../app/models/shoppingCart.js');
var ProductDB = require('../../app/models/ProductDB.js');

describe('ShoppingCart', function() {

  var shoppingCart, Product, product1, product2;

  beforeEach(function() {
    shoppingCart = new ShoppingCart();
    productDB = new ProductDB();
    productDB.findById(1, function(error, product) {
      product1 = product;
    });
    productDB.findById(2, function(error, product) {
      product2 = product;
    });
  });

  describe('adding items', function() {

    it('the shopping cart is empty at the outset', function() {
      expect(shoppingCart.items.length).toBe(0);
    });

    it('allows an item to be added if there is sufficient stock', function() {
      shoppingCart.addItem(product1, 1);
      expect(shoppingCart.items.length).toBe(1);
    });

    it('allows a quantity of more than one to be added', function() {
      shoppingCart.addItem(product1, 2);
      expect(shoppingCart.items[0].quantity).toBe(2);
      shoppingCart.addItem(product2, 1);
      shoppingCart.addItem(product2, 1);
      expect(shoppingCart.items[1].quantity).toBe(2);
    });

    it('does not allow an item to be added if there is insufficient stock', function() {
      productDB.findById(5, function(error, product) {
        expect(function() { shoppingCart.addItem(product, 1); })
      .toThrow('Insufficient stock');
      });
    });

  });

  describe('removing items', function() {

    it('allows an item to be removed', function() {
      shoppingCart.addItem(product1, 1);
      shoppingCart.addItem(product2, 1);
      expect(shoppingCart.items.length).toBe(2);
      shoppingCart.removeItem(product1);
      expect(shoppingCart.items.length).toBe(1);
      expect(shoppingCart.items[0].name).toBe('Suede Shoes, Blue');
    });

  });

  describe('amending item quantity', function() {

    it('allows the item quantity to be amended', function() {
      shoppingCart.addItem(product1, 1);
      expect(shoppingCart.items[0].quantity).toBe(1);
      shoppingCart.amendItemQuantity(product1, 5);
      expect(shoppingCart.items[0].quantity).toBe(5);
    });

    it('does not allow the item quantity to be amended if there is insufficient stock', function() {
      shoppingCart.addItem(product1, 1);
      expect(function() { shoppingCart.amendItemQuantity(product1, 7); })
      .toThrow('Insufficient stock');
    });

  });

  describe('total price', function() {

    it('keeps a running total', function() {
      expect(shoppingCart.totalPrice()).toBe(0);
      productDB.findById(4, function(error, product4) {
        shoppingCart.addItem(product4, 1);
        expect(shoppingCart.totalPrice()).toBe(19);
        productDB.findById(7, function(error, product7) {
          shoppingCart.addItem(product7, 1);
          expect(shoppingCart.totalPrice()).toBe(49);
        });
      });
    });

  });

  describe('applying discounts', function() {

    it('allows a £5 discount if the correct voucher code is entered', function() {
      shoppingCart.addItem(product2, 1);
      shoppingCart.applyDiscountVoucher('FIVERDISCOUNT');
      expect(shoppingCart.totalPrice()).toBe(37);
    });

    it('will raise an error if an incorrect voucher code is entered', function() {
      shoppingCart.addItem(product2, 1);
      expect(function() { shoppingCart.applyDiscountVoucher('TENNERDISCOUNT'); })
      .toThrow('Invalid voucher code');
      expect(shoppingCart.totalPrice()).toBe(42);
    });

    it('allows a £10 discount if the total is over £50', function() {
      productDB.findById(3, function(error, product3) {
        shoppingCart.addItem(product3, 1);
        productDB.findById(4, function(error, product4) {
          shoppingCart.addItem(product4, 1);
          expect(shoppingCart.totalPrice()).toBe(43);
        });
      });
    });

    it('allows a £15 discount if the total is over £75 and there is a footwear item', function() {
      shoppingCart.addItem(product1, 1);
      expect(shoppingCart.totalPrice()).toBe(84);
    });

  });

});
