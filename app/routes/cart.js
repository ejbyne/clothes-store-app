module.exports = function(app, express, productDB, shoppingCart) {

  var cartRoutes = express.Router();

  cartRoutes.route('/')

    .get(function(request, response) {
      response.json({ cart: shoppingCart.cartData() });
    });

  cartRoutes.route('/add')

    .post(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.addItem(product, parseInt(request.body.quantity));
          product.quantity -= parseInt(request.body.quantity);
          response.status(200).send({ success: true, message: 'Item successfully added to cart' });
        } catch (error) {
          response.status(403).send({ success: false, message: error });
        }
      });
    });

  cartRoutes.route('/amend')

    .put(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.amendItemQuantity(product, parseInt(request.body.newQuantity));
          product.quantity -= (parseInt(request.body.newQuantity) -
            parseInt(request.body.existingQuantity));
          response.status(200).send({ success: true, message: 'Item quantity successfully amended' });
        } catch (error) {
          response.status(403).send({ success: false, message: error });
        }
      });
    });

  cartRoutes.route('/remove')

    .delete(function(request, response) {
      productDB.findById(parseInt(request.body.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        try {
          shoppingCart.removeItem(product);
          product.quantity += parseInt(request.body.quantity);
          response.status(200).send({ success: true, message: 'Item successful removed from cart' });
        } catch (error) {
          response.status(403).send({ success: false, message: error });
        }
      });
    });

  cartRoutes.route('/voucher')

    .post(function(request, response) {
      try {
        shoppingCart.applyDiscountVoucher(request.body.code);
        response.status(200).send({ success: true, message: 'Discount successfully applied' });
      } catch (error) {
        response.status(403).send({ success: false, message: error });
      }
    });

  return cartRoutes;

};
