const db = require('../models');
const Food = db.food;
const FoodMaterial = db.foodMaterial;
const FoodCookStep = db.foodCookStep;

exports.getAll = (req, res) => {
    Food.findAll({attributes: ['id', 'foodName', 'foodPic', 'foodDescription', 'foodCalories']})
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

exports.getOneWithDetail = (req, res) => {
  const id = req.query.id;
  Food.findOne({
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
    where: {foodCategoryId: id},
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