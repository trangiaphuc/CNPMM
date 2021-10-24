const db = require('../models');
const ProductCategory = db.productCategory;

//get all products category
exports.getAll = (req, res) => {
    ProductCategory.findAll({attributes: ['id', 'catName']})
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



