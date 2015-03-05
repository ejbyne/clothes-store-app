var ProductDB = require('../models/productDB.js');
var ShoppingCart = require('../models/shoppingCart.js');

var apiRouter = function(app, express) {

  var productDB = new ProductDB();
  var shoppingCart = new ShoppingCart();
  var apiRouter = express.Router();

  apiRouter.route('/products')

    .get(function(request, response) {
      productDB.find(function(error, products) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        response.json({ products: products });
      });
    });

  apiRouter.route('/products/:id')

    .get(function(request, response) {
      productDB.findById(parseInt(request.params.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        response.json({ product: product });
      });
    });

  apiRouter.route('/cart')

    .get(function(request, response) {
      response.json({ items:           shoppingCart.items,
                      sumOfItemPrices: shoppingCart.sumOfItemPrices(),
                      voucherDiscount: shoppingCart.voucherDiscount(),
                      spendDiscount:   shoppingCart.spendDiscount(),
                      discounts:       shoppingCart.discounts(),
                      totalPrice:      shoppingCart.totalPrice()
                    });
    });

  apiRouter.route('/cart/add')

    .post(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.addItem(product, parseInt(request.body.quantity));
          return response.status(200).send({ success: true, message: 'Item added' });
        } catch (error) {
          return response.status(403).send({ success: false, message: error });
        }
      });
    });

  apiRouter.route('/cart/remove')

    .post(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.removeItem(product, parseInt(request.body.quantity));
          response.status(200).send({ success: true, message: 'Item removed' });
        } catch (error) {
          return response.status(403).send({ success: false, message: error });
        }
      });
    });

  return apiRouter;

};

module.exports = apiRouter;
