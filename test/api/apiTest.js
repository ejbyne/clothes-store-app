describe('API testing', function() {

  var host = 'http://localhost:3000';

  before(function() {
    casper.start(host);
  });

  it('should retrieve all of the products in the database', function() {
    casper.thenOpen(host + '/api/products', function(response) {
      expect(response.status).to.equal(200);
      expect(response.contentType).to.equal('application/json; charset=utf-8');
      expect('body').to.contain.text('"product1":{"_id":1,"name":"Almond Toe Court ' +
        'Shoes, Patent Black","category":"Women\'s Footwear","price":99,"quantity":5}');
      expect('body').to.contain.text('"product13":{"_id":13,"name":"Mid Twist Cut-Out ' +
        'Dress, Pink","category":"Women\'s Formalwear","price":540,"quantity":5}');
    });
  });

  it('should retrieve a specific product by specifying ID in URL parameters', function() {
    casper.thenOpen(host + '/api/products/2', function(response) {
      expect(response.status).to.equal(200);
      expect(response.contentType).to.equal('application/json; charset=utf-8');
      expect('body').to.have.text('{"product":{"_id":2,"name":"Suede Shoes, Blue"' +
        ',"category":"Women\'s Footwear","price":42,"quantity":4}}');
    });
  });

  it('should provide an error message if the product cannot be found', function() {
    casper.thenOpen(host + '/api/products/14', function(response) {
      expect(response.status).to.equal(403);
      expect('body').to.have.text('{"success":false,"message":"Unable to find product"}');
    });
  });

  it('should retrieve the contents of the shopping cart', function() {
    casper.thenOpen(host + '/api/cart', function(response) {
      expect(response.status).to.equal(200);
      expect(response.contentType).to.equal('application/json; charset=utf-8');
      expect('body').to.have.text('{"items":[],"sumOfItemPrices":0,' +
        '"voucherDiscount":0,"spendDiscount":0,"discounts":0,"totalPrice":0}');
    });
  });

  it('should add an item to the shopping cart', function() {
    casper.thenOpen(host + '/api/cart/add', {
                    method: 'post',
                    data:   { 'id': 1, 'quantity': 1 }
    }, function(response) {
      expect(response.status).to.equal(200);
      casper.thenOpen(host + '/api/cart', function(response) {
      expect('body').to.have.text('{"items":[{"id":1,"name":"Almond Toe Court Shoes, ' +
        'Patent Black","category":"Women\'s Footwear","price":99,"quantity":1}],' + 
        '"sumOfItemPrices":99,"voucherDiscount":0,"spendDiscount":15,"discounts":15,' +
        '"totalPrice":84}');
      });
    });
  });

  it('should remove an item from the shopping cart', function() {
    casper.thenOpen(host + '/api/cart/remove', {
                    method: 'post',
                    data:   { 'id': 1, 'quantity': 1 }
    }, function(response) {
      expect(response.status).to.equal(200);
      casper.thenOpen(host + '/api/cart', function(response) {
        expect('body').to.have.text('{"items":[],"sumOfItemPrices":0,' +
          '"voucherDiscount":0,"spendDiscount":0,"discounts":0,"totalPrice":0}');
      });
    });
  });

});
