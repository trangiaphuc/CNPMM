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
      .then(foods => {
        logger.info(`Request status: ${res.status(200)}  data ${foods}`);
        res.status(200).send({foods: foods});
      })
      .catch(err => {
        logger.error(`Request: status: ${res.status(500)}  error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
  };

  //get a food detail from databse with a id from req.query
exports.getOneWithDetail = (req, res) => {
  const id = req.params.id;
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
    .then(food => {
      logger.info(`Request status: ${res.status(200)} data ${food}`);
      res.status(200).send({food: food});
  })
  .catch(err => {
    logger.error(`Request status: ${res.status(500)} error ${err}`);
    res.status(500).send({
      message:
      err.message
    });
  });
};

//get all food with a category id
exports.getAllWithCatId = (req, res) => {
  const id = req.params.id;
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {foodCategoryId: id},
    attributes: ['id', 'foodName', 'foodPic', 'foodDescription', 'foodCalories']
  })
    .then(foods => {
      logger.info(`Request status: ${res.status(200)} data ${foods}`);
      res.status(200).send({foods: foods});
  })
  .catch(err => {
    logger.error(`Request status: ${res.status(500)} error ${err}`);
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving tutorials."
    });
  });
};