const controller = require('../controllers/deliveryMethod.controller');
const { authJwt } = require('../middleware');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //get all deliveryMethod
    app.get('/api/delivery-method/', 
    [authJwt.verifyToken], 
    controller.getAllDeliveryMethods);

    //add new deliveryMethod
    app.post('/api/delivery-method/', 
    [authJwt.verifyToken],
    controller.addNewDeliveryMethod);

}