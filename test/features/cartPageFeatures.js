describe('Cart page features', function() {

  before(function() {
    casper.start('http://localhost:3000');
  });

  it('enables the user to view his or her cart', function() {
    casper.then(function() {
      this.clickLabel('Cart ');
      casper.then(function() {
        expect('body').to.contain.text('Your Shopping Cart');
      });
    });
  });

  it('enables the user to view items added to his or her cart', function() {
    casper.then(function() {
      this.clickLabel('Home');
      casper.then(function() {
        this.fill('#product3 form', {
          'quantity': '2'
        }, false);
        casper.then(function() {
          this.click('#product3 button');
          casper.then(function() {
            this.clickLabel('Cart ');
            casper.then(function() {
              expect('body').to.contain.text('Your Shopping Cart');
              expect('body').to.contain.text('Leather Driver Saddle Loafers, Tan');
              expect('body').to.contain.text('£68');
            });
          });
        });
      });
    });
  });

});
