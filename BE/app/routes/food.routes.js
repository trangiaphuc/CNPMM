const controller = require('../controllers/food.controller');


module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //get all food
    app.get('/api/foods/', controller.getAll);
    //get food detail
    app.get('/api/foods/detail/', controller.getOneWithDetail);
    //get all food with a category id
    app.get('/api/foods/category/', controller.getAllWithCatId);
    
}