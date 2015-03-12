describe('About page features', function() {

  before(function() {
    casper.start('http://localhost:3000');
  });

  it('should have a heading', function() {
    casper.then(function() {
      this.clickLabel('About');
      casper.then(function() {
        expect('h1').to.contain.text('About us');
      });
    });
  });

});
