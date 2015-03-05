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

});
