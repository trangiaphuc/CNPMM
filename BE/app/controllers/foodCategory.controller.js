const db = require('../models');
const FoodCategory = db.foodCategory;
const Food = db.food;
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

  exports.getAllWithCatId = (req, res) => {
    const id = req.query.id;
    Food.findAll({
      where: {id: id},
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