var ProductDB = require('../app/models/productDB.js');

describe('ProductDB', function() {

  var productDB;

  beforeEach(function() {
    productDB = new ProductDB();
  });

  describe('finding products', function() {

    it('can retrieve all products', function() {
      var products = productDB.find();
      expect(Object.keys(products).length).toEqual(13);
    });

    it('can find a product by ID', function() {
      var product = productDB.findById(1);
      expect(product.name).toEqual("Almond Toe Court Shoes, Patent Black");
    });

  });

});
