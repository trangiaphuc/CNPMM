const controller = require('../controllers/food.controller');
const upload = require('../middleware/upload');
const { authJwt } = require('../middleware');
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

    //get all food
    app.get('/api/foods/', 
    [authJwt.verifyToken], 
    controller.getAll);
    //get food detail
    app.get('/api/foods/detail/:id', 
    [authJwt.verifyToken], 
    controller.getFoodDetailById);
    //
    app.get('/api/foods/cooksteps/:foodId', 
    [authJwt.verifyToken], 
    controller.getFoodCookStepById);
    //get all food with a category id
    app.get('/api/foods/category/:id', 
    [authJwt.verifyToken], 
    controller.userGetAllWithCatId);
    //search food
    app.post('/api/foods/search', 
    // [authJwt.verifyToken], 
    controller.userSearch);
    
    //lấy nguyên liêu ra note và cart
    app.get('/api/foods/foodextract/:foodId',
    // [authJwt.verifyToken],
    controller.extractFoodMaterial)
    //lay cac mon anh tu danh sach danh muc mon an
    app.post('/api/foods/favorite',
    [authJwt.verifyToken], 
    controller.getAllFavoriteFood)

    //merchant
    //add new
    app.post('/api/merchant/foods/addnewfood',
    // [authJwt.verifyToken, authJwt.isMerchant],
    upload.single("file"), 
    controller.merchantAddNewFood)

    //
    app.post('/api/merchant/foods/addnewfood/detail/:foodId',
    // [authJwt.verifyToken, authJwt.isMerchant],
    controller.merchantAddNewFoodDetails
    )

    //
    app.post('/api/merchant/foods/search',
    // [authJwt.verifyToken, authJwt.isMerchant],
    controller.merchantSearch)

    //
    app.get('/api/merchant/foods/category/:id',
    // [authJwt.verifyToken, authJwt.isMerchant],
    controller.merchantGetAllWithCatId
    )

    //
    app.post('/api/merchant/foods/update/:foodId',
    // [authJwt.verifyToken, authJwt.isMerchant],
    controller.merchantUpdateFood
    )

    app.post('/api/merchant/foods/update/image/:foodId',
    // [authJwt.verifyToken, authJwt.isMerchant],
    upload.single("file"),
    controller.merchantUpdateFoodImage
    )


    
}