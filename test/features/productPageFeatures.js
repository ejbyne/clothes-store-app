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
    expect("document.querySelectorAll('.product').length").to.evaluate.to.be.at.least(13);
  });

  it('should show the name, price and stock for each product', function() {
    expect('#product1').to.contain.text('Almond Toe Court Shoes, Patent Black');
    expect('#product1').to.contain.text('£99');
    expect('#product1').to.contain.text('5 in stock');
    expect('#product13').to.contain.text('Mid Twist Cut-Out Dress, Pink');
    expect('#product13').to.contain.text('£540');
    expect('#product13').to.contain.text('5 in stock');
  });

  it('should enable the user to add a product to the cart', function() {
    casper.then(function() {
      this.fill('#product1 form', {
        'quantity': '2'
      }, false);
      casper.then(function() {
        this.click('#product1 button');
        casper.then(function() {
          expect('body').to.have.text('Item was added to your cart');
        });
      });
    });
  });

});
