var Product = function() {
  this.stock = {
    1: {
      id:       1,
      name:     "Almond Toe Court Shoes, Patent Black",
      category: "Women's Footwear",
      price:    99,
      quantity: 5
    },
    2: {
      id:       2,
      name:     "Suede Shoes, Blue",
      category: "Women's Footwear",
      price:    42,
      quantity: 4
    },
    3: {
      id:       3,
      name:     "Leather Driver Saddle Loafers, Tan",
      category: "Men's Footwear",
      price:    34,
      quantity: 12
    },
    4: {
      id:       4,
      name:     "Flip Flops, Red",
      category: "Men's Footwear",
      price:    19,
      quantity: 6
    },
    5: {
      id:       5,
      name:     "Flip Flops, Blue",
      category: "Men's Footwear",
      price:    19,
      quantity: 0
    },
    6: {
      id:       6,
      name:     "Gold Button Cardigan, Black",
      category: "Women's Casualwear",
      price:    167,
      quantity: 6
    },
    7: {
      id:       7,
      name:     "Cotton Shorts, Medium Red",
      category: "Women's Casualwear",
      price:    30,
      quantity: 30
    },
    8: {
      id:       8,
      name:     "Fine Strip Short Sleeve Shirt, Grey",
      category: "Men's Casualwear",
      price:    49,
      quantity: 9
    },
    9: {
      id:       9,
      name:     "Fine Strip Short Sleeve Shirt, Green",
      category: "Men's Casualwear",
      price:    39.99,
      quantity: 3
    },
    10: {
      id:       10,
      name:     "Sharkskin Waistcoat, Charcoal",
      category: "Men's Formalwear",
      price:    75,
      quantity: 2
    },
    11: {
      id:       11,
      name:     "Lightweight Patch Pocket Blazer, Deer",
      category: "Men's Formalwear",
      price:    175,
      quantity: 1
    },
    12: {
      id:       12,
      name:     "Bird Print Dress, Black",
      category: "Women's Formalwear",
      price:    270,
      quantity: 10
    },
    13: {
      id:       13,
      name:     "Mid Twist Cut-Out Dress, Pink",
      category: "Women's Formalwear",
      price:    540,
      quantity: 5
    }
  };
};

Product.prototype.find = function() {
  return this.stock;
};

module.exports = Product;
