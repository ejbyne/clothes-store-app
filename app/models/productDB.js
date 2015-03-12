var ProductDB = function() {
  this.data = [
    {
      id:             1,
      name:           "Almond Toe Court Shoes, Patent Black",
      category:       "Women's Footwear",
      supercategory:  "Women's",
      price:          99,
      quantity:       5
    },
    {
      id:             2,
      name:           "Suede Shoes, Blue",
      category:       "Women's Footwear",
      supercategory:  "Women's", 
      price:          42,
      quantity:       4
    },
    {
      id:             3,
      name:           "Leather Driver Saddle Loafers, Tan",
      category:       "Men's Footwear",
      supercategory:  "Men's",
      price:          34,
      quantity:       12
    },
    {
      id:             4,
      name:           "Flip Flops, Red",
      category:       "Men's Footwear",
      supercategory:  "Men's",
      price:          19,
      quantity:       6
    },
    {
      id:             5,
      name:           "Flip Flops, Blue",
      category:       "Men's Footwear",
      supercategory:  "Men's",
      price:          19,
      quantity:       0
    },
    {
      id:             6,
      name:           "Gold Button Cardigan, Black",
      category:       "Women's Casualwear",
      supercategory:  "Women's",
      price:          167,
      quantity:       6
    },
    {
      id:             7,
      name:           "Cotton Shorts, Medium Red",
      category:       "Women's Casualwear",
      supercategory:  "Women's",
      price:          30,
      quantity:       5
    },
    {
      id:             8,
      name:           "Fine Strip Short Sleeve Shirt, Grey",
      category:       "Men's Casualwear",
      supercategory:  "Men's",
      price:          49.99,
      quantity:       9
    },
    {
      id:             9,
      name:           "Fine Strip Short Sleeve Shirt, Green",
      category:       "Men's Casualwear",
      supercategory:  "Men's",
      price:          39.99,
      quantity:       3
    },
    {
      id:             10,
      name:           "Sharkskin Waistcoat, Charcoal",
      category:       "Men's Formalwear",
      supercategory:  "Men's",
      price:          75,
      quantity:       2
    },
    {
      id:             11,
      name:           "Lightweight Patch Pocket Blazer, Deer",
      category:       "Men's Formalwear",
      supercategory:  "Men's",
      price:          175,
      quantity:       1
    },
    {
      id:             12,
      name:           "Bird Print Dress, Black",
      category:       "Women's Formalwear",
      supercategory:  "Women's",
      price:          270,
      quantity:       10
    },
    {
      id:             13,
      name:           "Mid Twist Cut-Out Dress, Pink",
      category:       "Women's Formalwear",
      supercategory:  "Women's",
      price:          540,
      quantity:       5
    }
  ];
};

ProductDB.prototype.find = function(callback) {
  if (this.data) {
    callback(null, this.data);
    return this.data;
  }
  callback('Unable to find products');
};

ProductDB.prototype.findById = function(id, callback) {
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].id === id) {
      return callback(null, this.data[i]);
    }
  }
  callback('Unable to find product');
};

module.exports = ProductDB;
