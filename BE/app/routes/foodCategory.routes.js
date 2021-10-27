const controller = require('../controllers/foodCategory.controller');
const { authJwt } = require('../middleware');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    //get all categories
    app.get('/api/foodcategory/',
    [authJwt.verifyToken], 
    controller.getAll);
    //app.get('/api/foodcategory/foods/', controller.getAllWithCatId);
    
}