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
      .then(data => {
        logger.info(`Request: status: ${res.status(200)} at ${new Date()} data ${data}`);
        res.status(200).send(data);
      })
      .catch(err => {
        logger.error(`Request: status: ${res.status(500)} at ${new Date()} error ${err}`);
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};



