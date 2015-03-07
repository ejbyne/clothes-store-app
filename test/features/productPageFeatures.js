describe('Product page features', function() {

  var productList = element.all(by.repeater('product in products'));
  
  it('should have a title', function() {
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).toEqual('Clothes Shop');
  });

  it('should display the website logo', function() {
    expect(element(by.css('header')).getText()).toContain('Clothes Shop');
  });

  it('should show all of the products', function() {
    expect(productList.count).toEqual(13);
  });

});
