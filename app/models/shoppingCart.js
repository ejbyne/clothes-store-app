var ShoppingCart = function() {
  this.items = [];
  this.isDiscountVoucher = false;
};

ShoppingCart.prototype.addItem = function(item, quantity) {
  var existingItem = this.findItem(item);
  if (item.quantity < quantity) {
    throw 'Insufficient stock';
  } else if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ id: item._id, name: item.name, category: item.category,
                      price: item.price, quantity: quantity });
  }
};

ShoppingCart.prototype.removeItem = function(item, quantity) {
  var existingItem = this.findItem(item);
  if (quantity > existingItem.quantity) {
    throw 'Invalid quantity';
  } else if (quantity < existingItem.quantity) {
    existingItem.quantity -= quantity;
  }
  else {
    this.items.splice(existingItem, 1);
  }
};

ShoppingCart.prototype.findItem = function(item) {
  return this.items.filter(function(existingItem) {
    return existingItem.id === item._id;
  })[0];
};

ShoppingCart.prototype.totalPrice = function() {
  if (this.items.length === 0) {
    return 0;
  }
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
