const db = require('../models');
const ProductCategory = db.productCategory;
const logger = require('../winston/winston');

//get all products category
exports.getAll = (req, res) => {
    ProductCategory.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      attributes: ['id', 'catName']
    })
      .then(productCategories => {
        logger.info(`Request status: ${res.status(200)} data ${productCategories}`);
        res.status(200).send({ productCategories: productCategories });
      })
      .catch(err => {
        logger.error(`Request status: ${res.status(500)} error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
};



