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

