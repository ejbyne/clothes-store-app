var ShoppingCart = function() {
  this.items = [];
  this.isDiscountVoucher = false;
};

ShoppingCart.prototype.addItem = function(item, quantity) {
  if (item.quantity < quantity) {
    throw 'Insufficient stock';
  } else if (this.findItem(item)) {
    this.findItem(item).quantity += quantity;
  } else {
    this.items.push({ id: item._id, name: item.name, category: item.category,
                      price: item.price, quantity: quantity });
  }
};

ShoppingCart.prototype.removeItem = function(item, quantity) {
  if (quantity > this.findItem(item).quantity) {
    throw 'Invalid quantity';
  } else if (quantity < this.findItem(item).quantity) {
    this.findItem(item).quantity -= quantity;
  }
  else {
    this.items.splice(this.findItem(item), 1);
  }
};

ShoppingCart.prototype.findItem = function(item) {
  return this.items.filter(function(existingItem) {
    return existingItem.id === item._id;
  })[0];
};

ShoppingCart.prototype.applyDiscountVoucher = function(code) {
  if (code !== 'FIVERDISCOUNT') {
    throw 'Invalid voucher code';
  }
  this.isDiscountVoucher = true;
};

ShoppingCart.prototype.totalPrice = function() {
  if (this.items.length === 0) {
    return 0;
  }
  return this.sumOfItemPrices() - this.totalDiscounts();
};

ShoppingCart.prototype.sumOfItemPrices = function() {
  if (this.items.length === 0) {
    return 0;
  }
  return this.items.map(function(item) {
    return item.price;
  }).reduce(function(sum, price) {
    return sum + price;
  });
};

ShoppingCart.prototype.totalDiscounts = function() {
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
  return this.items.filter(function(item) {
    return item.category === "Men's Footwear" || item.category === "Women's Footwear";
  })[0];
};

module.exports = ShoppingCart;
