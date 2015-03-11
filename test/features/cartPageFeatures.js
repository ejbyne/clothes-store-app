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

  it('enables the user to add an item to his or her cart', function() {
    casper.then(function() {
      this.clickLabel('Home');
      casper.then(function() {
        this.fill('#product6 form', {
          'quantity': '1'
        }, false);
        casper.then(function() {
          this.click('#product6 button');
          casper.then(function() {
            this.clickLabel('Cart ');
            casper.then(function() {
              expect('body').to.contain.text('Your Shopping Cart');
              expect('table').to.contain.text('Gold Button Cardigan, Black');
              expect('table').to.contain.text('Women\'s Casualwear');
              expect('table').to.contain.text('£167');
            });
          });
        });
      });
    });
  });

  it('enables the user to remove an item from his or her cart', function() {
    casper.then(function() {
      expect('#item6').to.be.visible;
      this.click('#item6 button');
      casper.waitWhileSelector('#item6', function() {
        expect('table').not.to.contain.text('Gold Button Cardigan, Black');
      });
    });
  });

  it('enables the user to view the total price for the cart items', function() {
    casper.then(function() {
      expect('table').to.contain.text('Total Price');
      expect('table').to.contain.text('£37');
    })
  });

  it('enables the user to apply a voucher discount', function() {
    casper.then(function() {
      this.fill('#voucher form', {
        'code': 'FIVERDISCOUNT'
      }, false);
      casper.then(function() {
        this.clickLabel('Apply Discount');
        casper.then(function() {
          casper.waitUntilVisible('#voucher-modal', function() {
          expect('#voucher-modal').to.contain.text('Discount successfully applied');
          expect('#table').to.contain.text('£32');
        });
        });
      });
    });
  });

});
