var ProductDB = require('../../app/models/productDB.js');

describe('ProductDB', function() {

  var productDB, server;

  beforeEach(function() {
    productDB = new ProductDB();
  });

  describe('finding products', function() {

    it('can retrieve all products', function() {
      productDB.find(function(error, products) {
        expect(products).toBe(productDB.data);
      });
    });

    it('will provide an error message if product data cannot be found', function() {
      productDB.data = null;
      productDB.find(function(error, products) {
        expect(error).toBe('Unable to find products');
      });
    });

    it('can find a product by ID', function() {
      productDB.findById(1, function(error, product) {
        expect(product).toBe(productDB.data[0]);
      });
    });

    it('will provide an error message if product ID cannot be found', function() {
      productDB.findById(14, function(error, product) {
        expect(error).toBe('Unable to find product');
      });
    });

  });

});
