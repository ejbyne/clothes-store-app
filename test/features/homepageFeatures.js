describe('Homepage features', function() {
  
  it('should have a title', function() {
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).toEqual('Clothes Shop');
  });

  it('should display the website logo', function() {
    expect(element(by.css('header')).getText()).toContain('Clothes Shop');
  });

});
