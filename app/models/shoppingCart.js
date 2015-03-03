var ShoppingCart = function() {
  this.items = [];
  this.fiverDiscount = false;
};

ShoppingCart.prototype.addItem = function(item) {
  this.items.push(item);
};

ShoppingCart.prototype.removeItem = function(item) {
  var index = this.items.indexOf(item);
  this.items.splice(index, 1);
};

ShoppingCart.prototype.totalPrice = function() {
  var total = this.sumOfItemPrices();
  return total - this.discounts();
};

ShoppingCart.prototype.sumOfItemPrices = function() {
  var prices = this.items.map(function(item) {
    return item.price;
  });
  return prices.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue;
  });
};

ShoppingCart.prototype.discounts = function() {
  var discounts = 0;
  if (this.fiverDiscount === true) {
    discounts =+ 5;
  }
  return discounts;
};

ShoppingCart.prototype.applyFiverDiscount = function(code) {
  if (code === 'FIVERDISCOUNT') {
    this.fiverDiscount = true;
  };
};

module.exports = ShoppingCart;
