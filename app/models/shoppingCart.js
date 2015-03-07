var ShoppingCart = function() {
  this.items = [];
  this.isDiscountVoucher = false;
};

ShoppingCart.prototype.addItem = function(item, quantity) {
  if (item.quantity < quantity) {
    throw 'Insufficient stock';
  } else if (this.findExistingItem(item)) {
    this.findExistingItem(item).quantity += quantity;
  } else {
    this.items.push({ id: item.id, name: item.name, category: item.category,
                      price: item.price * quantity, quantity: quantity });
  }
};

ShoppingCart.prototype.removeItem = function(item) {
  var existingItem = this.findExistingItem(item);
  this.items.splice(existingItem, 1);
};

ShoppingCart.prototype.amendItemQuantity = function(item, quantity) {
  var existingItem = this.findExistingItem(item);
  if (item.quantity < (quantity - existingItem.quantity)) {
    throw 'Insufficient stock';
  } else {
    existingItem.quantity = quantity;
  }
};

ShoppingCart.prototype.findExistingItem = function(item) {
  return this.items.filter(function(existingItem) {
    return existingItem.id === item.id;
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

ShoppingCart.prototype.cartData = function() {
  return {
    items:           this.items,
    sumOfItemPrices: this.sumOfItemPrices(),
    voucherDiscount: this.voucherDiscount(),
    spendDiscount:   this.spendDiscount(),
    totalDiscounts:  this.totalDiscounts(),
    totalPrice:      this.totalPrice()
  };
};

module.exports = ShoppingCart;
