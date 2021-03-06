const controller = require('../controllers/orders.controller');
const { authJwt } = require('../middleware');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //get all order history by userId
    app.get('/api/order/:userId', 
    [authJwt.verifyToken], 
    controller.getOrderHistoryByUserId);
    
    //get order detail by userid and orderid
    app.get('/api/order/:userId/:orderId', 
    [authJwt.verifyToken], 
    controller.getOrderDetailByUserId);
    
    //add new order
    app.post('/api/order/:userId', 
    [authJwt.verifyToken],
    controller.addNewOrder);
    
    //add new order
    app.post('/api/order/update/:orderId', 
    [authJwt.verifyToken],
    controller.updateOrder);

    //get confirming orders
    app.get('/api/order/:userId/confirming', 
    [authJwt.verifyToken], 
    controller.getConfirmingOrders);

    //get deliverying orders
    app.get('/api/order/:userId/deliverying', 
    [authJwt.verifyToken], 
    controller.getDeliveryingOrders);

    //get done orders
    app.get('/api/order/:userId/done', 
    [authJwt.verifyToken], 
    controller.getDoneOrders);
    
    //get cancel orders
    app.get('/api/order/:userId/cancelled',  
    [authJwt.verifyToken], 
    controller.getCancelledOrders);
    
    //get all order history by userId
    app.get('/api/merchant/order', 
    [authJwt.verifyToken, authJwt.isMerchant], 
    controller.merchantGetAllOrder);
    
    
}