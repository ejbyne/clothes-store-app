module.exports = function(app, express, productDB) {

  var productRoutes = express.Router();

  productRoutes.route('/')

    .get(function(request, response) {
      productDB.find(function(error, products) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        response.json({ products: products });
      });
    });

  productRoutes.route('/:id')

    .get(function(request, response) {
      productDB.findById(parseInt(request.params.id), function(error, product) {
        if (error) {
          return response.status(403).send({ success: false, message: error });
        }
        response.json({ product: product });
      });
    });

  return productRoutes;

};
