const controller = require('../controllers/foodCategory.controller');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/foodcategory/', controller.getAll);
    //app.get('/api/foodcategory/foods/', controller.getAllWithCatId);
    
}