var ProductDB = require('../models/productDB.js');
var ShoppingCart = require('../models/shoppingCart.js');

var apiRouter = function(app, express) {

  var productDB = new ProductDB();
  var shoppingCart = new ShoppingCart();
  var apiRouter = express.Router();

  apiRouter.route('/products')

    .get(function(request, response) {
      var products = productDB.find(function(error, products) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        response.json({ products: products });
      });
    });

  apiRouter.route('/products/:id')

    .get(function(request, response) {
      var id = parseInt(request.params.id);
      var product = productDB.findById(id, function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        response.json({ product: product });
      });
    });

  apiRouter.route('/cart')

    .get(function(request, response) {
      response.json({ items: shoppingCart.items,
                      sumOfItemPrices: 0,
                      voucherDiscount: 0,
                      spendDiscount:   0,
                      discounts:       0,
                      totalPrice:      0
                    });
    });

  return apiRouter;

};

module.exports = apiRouter;
