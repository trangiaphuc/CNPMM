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
  var userAvatar= "";
  if(req.body.gender == 1){
    userAvatar = "/resources/static/assets/images/userAvatar/male.png";
  }
  else{
    "/resources/static/assets/images/userAvatar/male.png";
  }
  User.create({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    gender: req.body.gender,
    userAvatar: "/resources/static/assets/images/userAvatar/female.png",
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
            logger.info(`User ${req.body.username} is registered`); 
            res.status(201).send({ message: "Success!", success: true });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          logger.info(`User ${req.body.username} registered`); 
          res.status(201).send({ message: "Success!", success: true });
        });
      }
    })
    .catch(err => {
      logger.error(`Error when user ${req.body.username} signed up. Err:  ${err}`)
      res.status(500).send({ message: err.message });
    });
};

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
        // logger.alert(`Could not find user ${req.body.username} when loggin at ${new Date()}`);
        res.status(404).send({ message: "User Not found!" });
      }
      else{

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          // logger.alert(`Invalid Password when user ${req.body.username} logged with ${req.body.password} at ${new Date()}`);
          res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        else{
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          var authorities = [];
          // logger.info(`User ${req.body.username} logged successfully at ${new Date()}`)
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token
            });
          });
        }
      }
    })
    .catch(err => {
      logger.error(`Error when user ${req.user.username} logged in. Error: ${err}`);
      res.status(500).send({ message: err.message });
    });
};