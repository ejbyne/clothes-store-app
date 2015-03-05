var ProductDB = require('../models/productDB.js');
var ShoppingCart = require('../models/shoppingCart.js');

var apiRouter = function(app, express, bodyParser) {

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
      console.log(request.body);
      var product = productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        shoppingCart.addItem(product, parseInt(request.body.quantity));
        return response.status(200).send({ success: true, message: 'Item added' });
      });
    });

  return apiRouter;

};

module.exports = apiRouter;
