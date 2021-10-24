const db = require('../models');
const FoodCategory = db.foodCategory;
const Food = db.food;

//get all food categories
  exports.getAll = (req, res) => {
    FoodCategory.findAll({attributes: ['id', 'catName']})
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

