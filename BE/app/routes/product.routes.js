const controller = require('../controllers/product.controller');


module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    //gete alal products
    app.get('/api/products/', controller.getAll);
    //get a product detail
    app.get('/api/products/detail', controller.getOneWithDetail);
    //get all products with category id
    app.get('/api/products/category/', controller.getAllProWithCatId);
    
}
