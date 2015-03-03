var ShoppingCart = function() {
  this.items = [];
  this.isDiscountVoucher = false;
};

ShoppingCart.prototype.addItem = function(item) {
  if (item.quantity === 0) {
    throw 'Item out of stock';
  }
  this.items.push(item);
};

ShoppingCart.prototype.removeItem = function(item) {
  var index = this.items.indexOf(item);
  this.items.splice(index, 1);
};

ShoppingCart.prototype.totalPrice = function() {
  return this.sumOfItemPrices() - this.discounts();
};

ShoppingCart.prototype.sumOfItemPrices = function() {
  var prices = this.items.map(function(item) {
    return item.price;
  });
  return prices.reduce(function(previousPrice, currentPrice) {
    return previousPrice + currentPrice;
  });
};

ShoppingCart.prototype.applyDiscountVoucher = function(code) {
  if (code !== 'FIVERDISCOUNT') {
    throw 'Invalid voucher code';
  }
  this.isDiscountVoucher = true;
};

ShoppingCart.prototype.discounts = function() {
  return 0 + this.voucherDiscount() + this.spendDiscount();
};

ShoppingCart.prototype.voucherDiscount = function() {
  if (this.isDiscountVoucher) {
    return 5;
  }
  return 0;
};

ShoppingCart.prototype.spendDiscount = function() {
  if (this.sumOfItemPrices() > 75 && this.isFootwearItem()) {
    return 15;
  }
  else if (this.sumOfItemPrices() > 50) {
    return 10;
  }
  return 0;
};

ShoppingCart.prototype.isFootwearItem = function() {
  var footwear = false;
  this.items.forEach(function(item) {
    if (item.category === "Men's Footwear" || item.category === "Women's Footwear") {
      footwear = true;
    }
  });
  return footwear;
};

module.exports = ShoppingCart;
