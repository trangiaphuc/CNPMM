const controller = require('../controllers/foodCategory.controller');
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
    app.get('/api/foodcategory/',
    [authJwt.verifyToken], 
    controller.userGetAllFoodCategories);
    //app.get('/api/foodcategory/foods/', controller.getAllWithCatId);
    
    //merchant
    //
    app.get('/api/merchant/foodcategory/',
    // [authJwt.verifyToken, authJwt.isMerchant], 
    controller.merchantGetAllFoodCategories);

    //
    app.post('/api/merchant/foodcategory/addnew',
    // [authJwt.verifyToken, authJwt.isMerchant], 
    upload.single("file"),
    controller.merchantAddNewFoodCategory);

    //
    app.post('/api/merchant/foodcategory/update/:id',
    // [authJwt.verifyToken, authJwt.isMerchant], 
    upload.single("file"),
    controller.merchantUpdateFoodCategory);
}