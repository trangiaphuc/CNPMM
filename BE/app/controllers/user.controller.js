const db = require('../models');
const User = db.user;
const Address = db.address;
const logger = require('../winston/winston');

//get all information about the user with an id from req.params
  exports.information = (req, res) => {
    const id = req.params.id;
    User.findByPk(id, {
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
    })
    .then(data => {
      if(data){
        logger.info(`Request: status: ${res.status(200)} at ${new Date()} data ${data}`);
        res.status(200).send(data);
      }
      else{
        logger.error(`Request: status: ${res.status(404)} at ${new Date()} error ${err}`);
        res.status(404).send({message: 'Can not find with id ' + id });
      }
    })
    .catch(err => {
      logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
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
    const id = req.params.id;

    User.update(req.body, 
      {
        logging: (sql, queryObject) =>{
          logger.info(sql, queryObject);
        },
        where: {id: id}
      }
    )
    .then(number => {
      if (number ==1)
      {
        logger.info(`Request: status: ${res.status(200)} at ${new Date()} data ${data}`);
        res.status(200).send({message: 'User Information updated successful!', success: true});
      }
      else
      {
        logger.error(`Request: status: ${res.status(404)} at ${new Date()} error ${err}`);
        res.status(404).send({message: 'User Information updated Error. Check your Request.body or your user is empty!', success: false});
      }
    })
    .catch(err => {
      logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
      res.status(500).send({message: err.message});
    });
  };

  //change user password
  exports.changepassword = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {id: id}
    })
    .then(number => {
      if (number ==1)
      {
        logger.info(`Request: status: ${res.status(200)} at ${new Date()} data ${data}`);
        res.status(200).send({message: 'User Password updated successful!', success: true});
      }
      else
      {
        logger.error(`Request: status: ${res.status(404)} at ${new Date()} error ${err}`);
        res.send({message: 'User Password updated Error. Check your Request.body or your user is empty!', success: false});
      }
    })
    .catch(err => {
      logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
      res.status(500).send({message: err.message});
    });

  };
  
  exports.insertaddress = (req, res) =>{
    //user identifier
    const id = req.body.userId
    User.findByPk(id,  {
      logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
      }})
      .then(data => {
        if(data){
          logger.info(`Request: status: ${res.status(200)} at ${new Date()} data ${data}`);
          //add address if had user
          Address.create({
            logging: (sql, queryObject) =>{
              logger.info(sql, queryObject);
            },
            userId: req.body.userId,
            province: req.query.province,
            district: req.query.district,
            ward: req.query.ward,
            flatNumber: req.query.flatNumber,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .then(() =>{
              logger.info(`Request: status: ${res.status(201)} at ${new Date()} data ${data}`);
              res.status(200).send({message: 'Address added successful!', success: true});
          })
          .catch(err => {
            logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
            res.status(500).send({message: err.message});
          });
        }
        else{
          //didn't have user
          logger.error(`Request: status: ${res.status(404)} at ${new Date()} User not found`);
          res.status(500).send({message: err.message});
        }
      })
      .catch(err => {
        logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
        res.status(500).send({message: err.message});
    });
  }

  exports.updateaddress = (req, res) => {
    //address identifier
    const id = req.params.id;
        //update if address existed
    Address.update(req.body, {
      logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
      where: {id: id}
    })
    .then(number => {
      if (number ==1)
      {
        logger.info(`Request: status: ${res.status(200)} at ${new Date()} data ${data}`);
        res.status(200).send({message: 'Address updated successful!', success: true});
      }
      else
      {
        logger.error(`Request: status: ${res.status(404)} at ${new Date()} error ${err}`);
        res.status(404).send({message: 'Address updated Error. Check your addressId!', success: false});
      }
      })
      .catch(err => {
        logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
        res.status(500).send({message: err.message});
      });
  }
  
  
  
  //test
  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  }