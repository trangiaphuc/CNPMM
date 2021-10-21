const controller = require('../controllers/food.controller');


module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/foods/', controller.getAll);
    app.get('/api/foods/detail/', controller.getOneWithDetail);
    
}