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
    controller.getAllWithCatId);
    //search food
    app.get('/api/foods/search', 
    [authJwt.verifyToken], 
    controller.search);
    //add new
    app.post('/api/foods/addnewfood',
    [authJwt.verifyToken],
    upload.single("file"), 
    controller.addNewFood)
    
}