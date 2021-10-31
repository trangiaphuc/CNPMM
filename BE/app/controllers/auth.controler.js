const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;
const logger = require('../winston/winston');
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//sign up function
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            logger.info(`User ${req.body.username} is registered to system at ${new Date().getTime()}`); 
            res.status(201).send({ message: "User was registered successfully!", success: true });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          logger.info(`User ${req.body.username} registered to system at ${new Date()}`); 
          res.status(201).send({ message: "User was registered successfully!", success: true });
        });
      }
    })
    .catch(err => {
      logger.error(`Error when user ${req.body.username} signed up at ${new Date()}. Err:  ${err}`)
      res.status(500).send({ message: err.message });
    });
};

//sign in function
exports.signin = (req, res) => {
  User.findOne({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        logger.alert(`Could not find user ${req.body.username} when loggin at ${new Date()}`);
        return res.status(404).send({ message: "User Not found."});
      }

      //compare password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      //invalid password
      if (!passwordIsValid) {
        logger.alert(`Invalid Password when user ${req.body.username} logged with ${req.body.password} at ${new Date()}`);
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!", 
          success: false
        });
      }

      //create token
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        logger.info(`User ${req.body.username} logged successfully at ${new Date()}`)
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      logger.error(`Error when user ${req.user.username} logged at ${new Date()}. Error: ${err}`);
      res.status(500).send({ message: err.message });
    });
};