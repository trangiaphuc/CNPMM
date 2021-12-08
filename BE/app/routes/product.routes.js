const controller = require('../controllers/product.controller');
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

    //gete alal products
    app.get('/api/products/',
    [authJwt.verifyToken],  
    controller.getAll);
    //get a product detail
    app.get('/api/products/detail/:id',
    [authJwt.verifyToken],  
    controller.getOneWithDetail);
    //get all products with category id
    app.get('/api/products/category/:id', 
    [authJwt.verifyToken], 
    controller.getAllProWithCatId);
     //product search     app.get('/api/products/category/:id', 
     app.post('/api/products/search/', 
     [authJwt.verifyToken], 
     controller.search);
    //add new product
     app.post('/api/products/addnewproduct', 
     [authJwt.verifyToken],
     upload.single("file"),
     controller.addNewProduct)
    
}
