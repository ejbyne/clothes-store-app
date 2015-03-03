var productDB = require('../app/models/product.js');

describe('Product', function() {

  var Product;

  beforeEach(function() {
    Product = new productDB();
  });

  it('can retrieve all products', function() {
    products = Product.find();
    expect(Object.keys(products).length).toEqual(13);
  });

});
