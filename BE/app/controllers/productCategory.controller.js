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
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};



