describe('ProductCtrl', function(){

  it('should list all 13 products', function() {
    var scope = {},
        ctrl = new ProductCtrl(scope);

    expect(scope.products.length).toBe(13);
  });

});
