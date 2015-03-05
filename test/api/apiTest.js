describe('API testing', function() {

  var host = 'http://locahost:3000';

  before(function() {
    casper.start(host);
  });

  it('should retrieve all of the products in the database', function() {
    casper.thenOpen(host + '/api/products', function(response) {
      expect(response.body).to.contain('Men\'s Footwear');
    });
  });

});
