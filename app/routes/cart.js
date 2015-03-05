module.exports = function(app, express, productDB, shoppingCart) {

  var cartRoutes = express.Router();

  cartRoutes.route('/')

    .get(function(request, response) {
      response.json({ items:           shoppingCart.items,
                      sumOfItemPrices: shoppingCart.sumOfItemPrices(),
                      voucherDiscount: shoppingCart.voucherDiscount(),
                      spendDiscount:   shoppingCart.spendDiscount(),
                      totalDiscounts:  shoppingCart.totalDiscounts(),
                      totalPrice:      shoppingCart.totalPrice()
                    });
    });

  cartRoutes.route('/add')

    .post(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.addItem(product, parseInt(request.body.quantity));
          product.quantity += parseInt(request.body.quantity);
          return response.status(200).send({ success: true, message: 'Item added' });
        } catch (error) {
          return response.status(403).send({ success: false, message: error });
        }
      });
    });

  cartRoutes.route('/remove')

    .post(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.removeItem(product, parseInt(request.body.quantity));
          product.quantity -= parseInt(request.body.quantity);
          response.status(200).send({ success: true, message: 'Item removed' });
        } catch (error) {
          return response.status(403).send({ success: false, message: error });
        }
      });
    });

  cartRoutes.route('/voucher')

    .post(function(request, response) {
      try {
        shoppingCart.applyDiscountVoucher(request.body.code);
        response.status(200).send({ success: true, message: 'Discount applied' });
      } catch(error) {
        return response.status(403).send({ success: false, message: error });
      }
    });

  return cartRoutes;

};
