const controller = require('../controllers/productCategory.controller');
const { authJwt } = require('../middleware');
const upload = require('../middleware/upload');
const express = require('express');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use(express.static("../../resources/static/assets/"));

    //get all categories
    app.get('/api/productcategory/',
    [authJwt.verifyToken], 
    controller.usergetAllProductsCategory);
    
    //merchant
    //get all categories
    app.get('/api/merchant/productcategory/',
    [authJwt.verifyToken, authJwt.isMerchant], 
    controller.merchantgetAllProductsCategory);

    //
    app.post('/api/merchant/productcategory/addnew',
    [authJwt.verifyToken, authJwt.isMerchant], 
    // upload.single("file"),
    controller.merchantAddNewProductCategory);

    app.post('/api/merchant/productcategory/update/:id',
    [authJwt.verifyToken, authJwt.isMerchant], 
    // upload.single("file"),
    controller.merchantUpdateProductCategory);
}