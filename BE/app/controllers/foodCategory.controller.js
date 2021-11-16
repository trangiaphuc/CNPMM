const db = require('../models');
const FoodCategory = db.foodCategory;
const logger = require('../winston/winston');


//get all food categories
  exports.getAll = (req, res) => {
    FoodCategory.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      attributes: ['id', 'catName']
    })
      .then(foodCategories => {
        logger.info(`Request status: ${res.status(200)} data ${foodCategories}`);
        res.status(200).send({foodCategories: foodCategories});
      })
      .catch(err => {
        logger.error(`Request status: ${res.status(500)} error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
  };

