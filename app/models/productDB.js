var ProductDB = function() {
  this.data = {
    'product1': {
      _id:      1,
      name:     "Almond Toe Court Shoes, Patent Black",
      category: "Women's Footwear",
      price:    99,
      quantity: 5
    },
    'product2': {
      _id:      2,
      name:     "Suede Shoes, Blue",
      category: "Women's Footwear",
      price:    42,
      quantity: 4
    },
    'product3': {
      _id:      3,
      name:     "Leather Driver Saddle Loafers, Tan",
      category: "Men's Footwear",
      price:    34,
      quantity: 12
    },
    'product4': {
      _id:      4,
      name:     "Flip Flops, Red",
      category: "Men's Footwear",
      price:    19,
      quantity: 6
    },
    'product5': {
      _id:      5,
      name:     "Flip Flops, Blue",
      category: "Men's Footwear",
      price:    19,
      quantity: 0
    },
    'product6': {
      _id:      6,
      name:     "Gold Button Cardigan, Black",
      category: "Women's Casualwear",
      price:    167,
      quantity: 6
    },
    'product7': {
      _id:      7,
      name:     "Cotton Shorts, Medium Red",
      category: "Women's Casualwear",
      price:    30,
      quantity: 30
    },
    'product8': {
      _id:      8,
      name:     "Fine Strip Short Sleeve Shirt, Grey",
      category: "Men's Casualwear",
      price:    49,
      quantity: 9
    },
    'product9': {
      _id:      9,
      name:     "Fine Strip Short Sleeve Shirt, Green",
      category: "Men's Casualwear",
      price:    39.99,
      quantity: 3
    },
    'product10': {
      _id:      10,
      name:     "Sharkskin Waistcoat, Charcoal",
      category: "Men's Formalwear",
      price:    75,
      quantity: 2
    },
    'product11': {
      _id:      11,
      name:     "Lightweight Patch Pocket Blazer, Deer",
      category: "Men's Formalwear",
      price:    175,
      quantity: 1
    },
    'product12': {
      _id:      12,
      name:     "Bird Print Dress, Black",
      category: "Women's Formalwear",
      price:    270,
      quantity: 10
    },
    'product13': {
      _id:      13,
      name:     "Mid Twist Cut-Out Dress, Pink",
      category: "Women's Formalwear",
      price:    540,
      quantity: 5
    }
  };
};

ProductDB.prototype.find = function(callback) {
  if (this.data) {    
    callback(null, this.data);
  }
  callback('Unable to find products');
};

ProductDB.prototype.findById = function(id, callback) {
  for (var key in this.data) {
    if (this.data[key]._id === id) {
      callback(null, this.data[key]);
    }
  }
  callback('Unable to find product');
};

module.exports = ProductDB;
