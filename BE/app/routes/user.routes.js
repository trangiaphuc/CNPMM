const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //get user profile
  app.get("/api/auth/user/information/:id", [authJwt.verifyToken], controller.information);
  //update user information
  app.put("/api/auth/user/updateinfor/:id", [authJwt.verifyToken], controller.updateinfor);
  //change user password
  app.get("/api/auth/user/changepassword/:id", [authJwt.verifyToken], controller.changepassword);


  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};