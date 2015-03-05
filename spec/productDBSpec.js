var ProductDB = require('../app/models/productDB.js');

describe('ProductDB', function() {

  var productDB, server;

  beforeEach(function() {
    productDB = new ProductDB();
    server = jasmine.createSpyObj('server', ['callback']);
  });

  describe('finding products', function() {

    it('can retrieve all products', function() {
      productDB.find(server.callback);
      expect(server.callback).toHaveBeenCalledWith(null, productDB.data);
    });

    it('will provide an error message if product data cannot be found', function() {
      productDB.data = null;
      productDB.find(server.callback);
      expect(server.callback).toHaveBeenCalledWith('Unable to find products');
    });

    it('can find a product by ID', function() {
      productDB.findById(1, server.callback);
      expect(server.callback).toHaveBeenCalledWith(null, productDB.data.product1);
    });

    it('will provide an error message if product ID cannot be found', function() {
      productDB.findById(14, server.callback);
      expect(server.callback).toHaveBeenCalledWith('Unable to find product');
    });

  });

});
