const controller = require('../controllers/images.controller');
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

    //get all food
    app.post('/api/upload/', 
    upload.single("file"),
    controller.uploadFiles);

    app.get('/api/images/:id', 
    controller.getImages);
    
}