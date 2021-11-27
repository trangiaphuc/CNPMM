const controller = require('../controllers/paymentMethod.controller');
const { authJwt } = require('../middleware');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //get all payment Methods
    app.get('/api/payment-method/', 
    [authJwt.verifyToken], 
    controller.getAllPaymentMethods);

    //add new payment Methods
    app.post('/api/payment-method/', 
    [authJwt.verifyToken],
    controller.addNewPaymentMethod);
    
}