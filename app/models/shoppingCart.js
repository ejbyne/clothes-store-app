var ShoppingCart = function() {
  this.items = [];
  this.isDiscountVoucher = false;
};

ShoppingCart.prototype.addItem = function(product, quantity) {
  if (product.quantity < quantity) {
    throw 'Insufficient stock';
  } else if (this.findExistingItem(product)) {
    this.findExistingItem(product).quantity += quantity;
  } else {
    this.items.push({ id: product.id, name: product.name, category: product.category,
                      price: product.price * quantity, quantity: quantity });
  }
};

ShoppingCart.prototype.removeItem = function(product) {
  var existingItem = this.findExistingItem(product);
  this.items.splice(existingItem, 1);
};

ShoppingCart.prototype.amendItemQuantity = function(product, quantity) {
  var existingItem = this.findExistingItem(product);
  if (product.quantity < (quantity - existingItem.quantity)) {
    throw 'Insufficient stock';
  } else {
    existingItem.quantity = quantity;
    existingItem.price = product.price * existingItem.quantity;
  }
};

ShoppingCart.prototype.findExistingItem = function(product) {
  return this.items.filter(function(existingItem) {
    return existingItem.id === product.id;
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
