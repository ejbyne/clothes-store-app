describe('API tests', function() {

  var host = 'http://localhost:3000';

  before(function() {
    casper.start(host);
  });

  describe('products', function() {

    it('can retrieve all of the products in the database', function() {
      casper.thenOpen(host + '/products', function(response) {
        expect(response.status).to.equal(200);
        expect(response.contentType).to.equal('application/json; charset=utf-8');
        expect('body').to.contain.text('{"id":1,"name":"Almond Toe Court ' +
          'Shoes, Patent Black","category":"Women\'s Footwear","price":99,"quantity":5}');
        expect('body').to.contain.text('{"id":13,"name":"Mid Twist Cut-Out ' +
          'Dress, Pink","category":"Women\'s Formalwear","price":540,"quantity":5}');
      });
    });

    it('can retrieve a specific product by specifying the ID in the URL parameters', function() {
      casper.thenOpen(host + '/products/2', function(response) {
        expect(response.status).to.equal(200);
        expect(response.contentType).to.equal('application/json; charset=utf-8');
        expect('body').to.have.text('{"product":{"id":2,"name":"Suede Shoes, Blue"' +
          ',"category":"Women\'s Footwear","price":42,"quantity":4}}');
      });
    });

    it('will provide an error message if a specified product ID cannot be found', function() {
      casper.thenOpen(host + '/products/14', function(response) {
        expect(response.status).to.equal(403);
        expect('body').to.have.text('{"success":false,"message":"Unable to find product"}');
      });
    });

  });

  describe('cart', function() {

    it('can retrieve the contents of the shopping cart', function() {
      casper.thenOpen(host + '/cart', function(response) {
        expect(response.status).to.equal(200);
        expect(response.contentType).to.equal('application/json; charset=utf-8');
        expect('body').to.have.text('{"cart":{"items":[],"sumOfItemPrices":0,' +
          '"voucherDiscount":0,"spendDiscount":0,"totalDiscounts":0,"totalPrice":0}}');
      });
    });

    it('will raise an error when adding an item to the cart if there is insufficient stock', function() {
      casper.thenOpen(host + '/cart/add', {
                      method: 'post',
                      data:   { 'id': 1, 'quantity': 7 }
      }, function(response) {
        expect(response.status).to.equal(403);
        expect('body').to.have.text('{"success":false,"message":"Insufficient stock"}');
      });
    });

    it('can add an item to the cart if there is sufficient stock', function() {
      casper.thenOpen(host + '/cart/add', {
                      method: 'post',
                      data:   { 'id': 1, 'quantity': 1 }
      }, function(response) {
        expect(response.status).to.equal(200);
        casper.thenOpen(host + '/cart', function(response) {
          expect('body').to.have.text('{"cart":{"items":[{"id":1,"name":"Almond Toe Court Shoes, ' +
            'Patent Black","category":"Women\'s Footwear","price":99,"quantity":1}],' + 
            '"sumOfItemPrices":99,"voucherDiscount":0,"spendDiscount":15,"totalDiscounts":15,' +
            '"totalPrice":84}}');
          casper.thenOpen(host + '/products/1', function(response) {
            expect('body').to.contain.text('"quantity":4');
          });
        });
      });
    });

    it('can amend the quantity of an item in the cart', function() {
      casper.thenOpen(host + '/cart/amend', {
                      method: 'post',
                      data:   { 'id': 1, 'existingQuantity': 1, 'newQuantity': 2 },
                      headers: { 'X-HTTP-Method-Override': 'PUT' }
      }, function(response) {
        expect(response.status).to.equal(200);
        casper.thenOpen(host + '/cart', function(response) {
          expect('body').to.have.text('{"cart":{"items":[{"id":1,"name":"Almond Toe Court Shoes, ' +
            'Patent Black","category":"Women\'s Footwear","price":198,"quantity":2}],' + 
            '"sumOfItemPrices":198,"voucherDiscount":0,"spendDiscount":15,"totalDiscounts":15,' +
            '"totalPrice":183}}');
          casper.thenOpen(host + '/products/1', function(response) {
            expect('body').to.contain.text('"quantity":3');
          });
        });
      });
    });

    it('will raise an error when amending an item quantity if there is insufficient stock', function() {
      casper.thenOpen(host + '/cart/amend', {
                      method: 'post',
                      data:   { 'id': 1, 'existingQuantity': 2, 'newQuantity': 6 },
                      headers: { 'X-HTTP-Method-Override': 'PUT' }
      }, function(response) {
        expect(response.status).to.equal(403);
        expect('body').to.have.text('{"success":false,"message":"Insufficient stock"}');
      });
    });

    it('can remove an item from the cart', function() {
      casper.thenOpen(host + '/cart/remove', {
                      method: 'post',
                      data:   { 'id': 1, 'quantity': 2 },
                      headers: { 'X-HTTP-Method-Override': 'DELETE' }
      }, function(response) {
        expect(response.status).to.equal(200);
        casper.thenOpen(host + '/cart', function(response) {
          expect('body').to.have.text('{"cart":{"items":[],"sumOfItemPrices":0,' +
            '"voucherDiscount":0,"spendDiscount":0,"totalDiscounts":0,"totalPrice":0}}');
          casper.thenOpen(host + '/products/1', function(response) {
            expect('body').to.contain.text('"quantity":5');
          });
        });
      });
    });

    it('will raise an error if an invalid discount voucher code is given', function() {
      casper.thenOpen(host + '/cart/add', {
                      method: 'post',
                      data:   { 'id': 2, 'quantity': 1 }
      }, function(response) {
        casper.thenOpen(host + '/cart/voucher', {
                        method: 'post',
                        data:   { 'code': 'TENNERDISCOUNT' }
        }, function(response) {
          expect(response.status).to.equal(403);
          expect('body').to.contain.text('{"success":false,"message":"Invalid voucher code"}');
        });
      });
    });

    it('will apply a voucher discount if the correct code is given', function() {
      casper.thenOpen(host + '/cart/voucher', {
                      method: 'post',
                      data:   { 'code': 'FIVERDISCOUNT' }
      }, function(response) {
        expect(response.status).to.equal(200);
        casper.thenOpen(host + '/cart', function(response) {
          expect('body').to.have.text('{"cart":{"items":[{"id":2,"name":"Suede Shoes, Blue",' +
            '"category":"Women\'s Footwear","price":42,"quantity":1}],' + 
            '"sumOfItemPrices":42,"voucherDiscount":5,"spendDiscount":0,"totalDiscounts":5,' +
            '"totalPrice":37}}');
        });
      });
    });

  });

});
