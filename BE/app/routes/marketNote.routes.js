const controller = require('../controllers/marketNote.controller');
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
    app.get('/api/marketnote/:userId', 
    // [authJwt.verifyToken], 
    controller.getAllMarketNotes);
    
    //add 
    app.post('/api/marketnote/:userId/add/', 
    [authJwt.verifyToken], 
    controller.addToNote);
    
    //delete
    app.put('/api/marketnote/:userId/delete/:marketNoteId', 
    [authJwt.verifyToken],
    controller.deleteMarketNote);

    //delete
    app.put('/api/marketnote/:userId/edit/:marketNoteId', 
    [authJwt.verifyToken],
    controller.editNote);

}