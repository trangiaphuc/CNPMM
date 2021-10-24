const db = require('../models');
const Food = db.food;
const FoodMaterial = db.foodMaterial;
const FoodCookStep = db.foodCookStep;
const logger = require('../winston/winston');

//get all food objects
exports.getAll = (req, res) => {
    Food.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      attributes: ['id', 'foodName', 'foodPic', 'foodDescription', 'foodCalories']
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  //get a food detail from databse with a id from req.query
exports.getOneWithDetail = (req, res) => {
  const id = req.query.id;
  Food.findOne({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {id: id},
    include:[
      {
        model: FoodMaterial,
        attributes:['id', 'foodMaterialName', 'quantityDescription', 'productId'],
      },
      {
        model: FoodCookStep,
        attributes:['id', 'stepNumber', 'stepDescription']
      }
    ]
  })
    .then(data => {
      res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

//get all food with a category id
exports.getAllWithCatId = (req, res) => {
  const id = req.query.id;
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {foodCategoryId: id},
    attributes: ['id', 'foodName', 'foodPic', 'foodDescription', 'foodCalories']
  })
    .then(data => {
      res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving tutorials."
    });
  });
};