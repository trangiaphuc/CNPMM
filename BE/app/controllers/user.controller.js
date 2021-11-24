const db = require('../models');
const { data } = require('../winston/winston');
const User = db.user;
const FavoriteFoodCategory = db.favoritesFoodCategory;
const logger = require('../winston/winston');
var bcrypt = require('bcryptjs');
var fs = require("fs");

//get all information about the user with an id from req.params
  exports.information = (req, res) => {
    const id = req.params.id;
    User.findByPk(id, {
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
    })
    .then(user => {
      if(user){
        logger.info(`Request status: ${res.status(200)} data ${user}`);
        //update lai sau

        //chuyen doi hinh anh userAvatar sang base64 url
        //gan vao bien moi
        //gui lai qua res
        const userAvatar = fs.readFileSync(
          __basedir + user.userAvatar
        );
        var base64Avatar = Buffer.from(userAvatar).toString("base64");

        user.userAvatar = "data:image/png;base64,"+base64Avatar;

        res.status(200).send({information: user});
      }
      else{
        logger.error(`${new Date()}: Request: status: ${res.status(404)}  error User not found`);
        res.status(404).send({message: 'User not found!'});
      }
    })
    .catch(err => {
      logger.error(`Request status: ${res.status(500)} error ${err}`);
      res.status(500).send({message: err.message});
    })
  };

  //update user information with req.body and req.params.id
  exports.updateinfor = (req, res) => {
    // update require:
    // - x-access-tokens
    // - email
    // - firstname
    // - lastname
    // - phone
    // - birthday
    //address
    const id = req.params.id;
    User.findByPk(id, {
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
        }
    })
    .then(user => {
      if(user){
        user.update({
          logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phone: req.body.phone,
          email: req.body.email,
          birthday: new Date(req.body.birthday),
          address: req.body.address,
        })
        .then(updatedRecord => {
          if(updatedRecord){
            logger.info(`Request status: ${res.status(200)} data ${updatedRecord}`);
            res.status(200).send({message: "Success!"});
          }
          else{
            logger.error(`Request status: ${res.status(500)} error update Fail`);
            res.status(500).send({message: "Fail!"});
          }
        })
        .catch(err => {
          logger.error(`Request status: ${res.status(500)}  error ${err}`);
          res.status(500).send({message: err.message});
        })
      }
      else{
        logger.error(`Request status: ${res.status(404)}  error User not found`);
        res.status(404).send({message: 'User not found!'});
      }
    })
    .catch(err => {
      logger.error(`Request status: ${res.status(500)}  error ${err}`);
      res.status(500).send({message: err.message})
    });
  };

  //change user password
  exports.changepassword = (req, res) => {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;

    User.findByPk(id, {
      logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
      }}
    )
    .then(user =>{
      
      if(user){

        var passwordIsValid = bcrypt.compareSync(
          oldPassword,
          user.password
        );
        if(!passwordIsValid)
        {
          res.status(401).send('Invalid Password!');
        }
        else{
          user.update(
            // req.body, 
            {
              logging: (sql, queryObject) =>{
                logger.info(sql, queryObject);
              },
              password: req.body.password,
              // where: {id: id}
            })
            .then(updatedRecord => {
              if (updatedRecord)
              {
                logger.info(`Request status: ${res.status(200)} data ${data}`);
                res.status(200).send({message: 'Success!', success: true});
              }
              else
              {
                logger.error(`Request status: ${res.status(404)} error ${err}`);
                res.send({message: 'Fail!', success: false});
              }
            })
            .catch(err => {
              logger.error(`Request status: ${res.status(500)} error ${err}`);
              res.status(500).send({message: err.message});
            });
        }

      }
      else{
        logger.error(`Request status: ${res.status(404)}  error User not found`);
        res.status(404).send({message: 'User not found'});
      }

    })
    .catch(err => {
      logger.error(`Request status: ${res.status(500)}  error ${err}`);
      res.status(500).send({message: err.message});
    })
  };
  
  //add user favorite food categories
  exports.addFavorites = (req, res) =>{
    const userId = req.body.userId;
    const favorites = req.body.favorites;
    var flag = true;
    favorites.forEach(favorite => {
      FavoriteFoodCategory.create({
        logging: (sql, queryObject) =>{
          logger.info(sql, queryObject);
        },
        userId: userId,
        foodCategoryId: favorite,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .catch(err =>{
        flag = false;
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
      });
    });
    if(flag) {
      logger.info(`Request status: ${res.status(201)}`);
      res.status(201).send( {message:"Success!"} );
    }
    else{
      logger.error(`Request status: ${res.status(500)}`);
      res.status(500).send({message: "Fail!"} );
    }
  }

  //update user favorite food categories
  //delete favorite all current food categories
  //add new favorite food categories record
  exports.updateFavorites = (req, res) =>{
    const userId = req.body.userId;
    var flag = true;
    FavoriteFoodCategory.destroy({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: { userId: userId},
    })
    .catch(err => {
      flag = false;
      logger.error(`Request status: ${res.status(500)}  error ${err}`);
    });
    if(flag) {
      var flag = true;
      const newFavorites = req.body.newFavorites;
      newFavorites.forEach(favorite => {
        FavoriteFoodCategory.create({
          logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          userId: userId,
          foodCategoryId: favorite,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .catch(err =>{
          flag = false;
          logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
        });
      });
      if(flag) {
        logger.info(`Request status: ${res.status(201)}`);
        res.status(201).send( {message:"Success!"} );
      }
      else{
        logger.error(`Request status: ${res.status(500)}`);
        res.status(500).send({message: "Fail!"} );
      }
    }
    else {
      logger.error(`Request status: ${res.status(500)}`);
      res.status(500).send({message: "Fail!"})
    }
  }
  
  // exports.changeAvatar = (req, res) =>{
  //   const userId = req.params.userId;
  //   User.findByPk(userId, {
  //     logging: (sql, queryObject) =>{
  //       logger.info(sql, queryObject);
  //     },
  //   })
  //   .then(user => {
  //     if(user){
        
  //     }
  //     else{
  //       res.status(404).send({message: "User not found!"});
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({message: err.message});
  //   })
  // }

  
  //test ROLE
  // exports.allAccess = (req, res) => {
  //   res.status(200).send("Public Content.");
  // };
  
  // exports.userBoard = (req, res) => {
  //   res.status(200).send("User Content.");
  // };
  
  // exports.adminBoard = (req, res) => {
  //   res.status(200).send("Admin Content.");
  // };
  
  // exports.moderatorBoard = (req, res) => {
  //   res.status(200).send("Moderator Content.");
  // }