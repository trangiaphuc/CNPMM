const controller = require('../controllers/cart.controller');
const { authJwt } = require('../middleware');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //get all cart detail in user cart
    app.get('/api/cart/:userId', 
    [authJwt.verifyToken], 
    controller.getCartByUserId);

    app.post('/api/cart/:userId/addCartItem', 
    [authJwt.verifyToken],
    controller.addCartItem);
    //get edit cart detail  
    app.put('/api/cart/:userId/editCartItem/:cartDetailId', 
    [authJwt.verifyToken], 
    controller.editCartDetail);
    //get all food with a category id
  
    
}