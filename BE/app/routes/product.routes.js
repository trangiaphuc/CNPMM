const controller = require('../controllers/product.controller');


module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/products/', controller.getAll);
    app.get('/api/products/detail', controller.getOneWithDetail);
    app.get('/api/products/category/', controller.getAllProWithCatId);
    
}
