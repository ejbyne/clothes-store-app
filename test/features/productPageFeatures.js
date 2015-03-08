describe('Product page features', function() {

  before(function() {
    casper.start('http://localhost:3000');
  });

  it('should have a title', function() {
    casper.then(function() {
      expect('title').to.have.text('Clothes Shop');
    });
  });

  it('should display the website logo', function() {
    expect('header').to.contain.text('Clothes Shop');
  });

  it('should show all of the products', function() {
    expect("document.querySelectorAll('.product li').length").to.evaluate.to.be.at.least(13);
  });

});
