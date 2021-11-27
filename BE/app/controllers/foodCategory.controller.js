const db = require('../models');
const FoodCategory = db.foodCategory;
const fs = require('fs');
const logger = require('../winston/winston');


//get all food categories
  exports.getAll = (req, res) => {
    FoodCategory.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      attributes: ['id', 'catName', 'catIcon']
    })
      .then(foodCategories => {
        logger.info(`Request status: ${res.status(200)} data ${foodCategories}`);
        foodCategories.forEach(foodCategory =>{          
          const image = fs.readFileSync(
            __basedir + foodCategory.catIcon
          );
          var base64Image = Buffer.from(image).toString("base64");
          foodCategory.catIcon = "data:image/png;base64,"+base64Image;
        });
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

