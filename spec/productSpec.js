var ProductDB = require('../app/models/productDB.js');

describe('Product', function() {

  var Product;

  beforeEach(function() {
    Product = new ProductDB();
  });

  it('can retrieve all products', function() {
    var products = Product.find();
    expect(Object.keys(products).length).toEqual(13);
  });

  it('can find a product by ID', function() {
    var product = Product.findById(1);
    expect(product.name).toEqual("Almond Toe Court Shoes, Patent Black");
  });

});
