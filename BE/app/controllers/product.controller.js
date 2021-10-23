const db = require('../models');
const Product = db.product;

exports.getAll = (req, res) => {
    Product.findAll(
      {attributes: ["id", "proPic", "proName", "proDescription", "quantity", "price", "brand", "origin",
     "productAt", "expireAt", "manual", "preserve", "productCategoryId"]}
     )
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

exports.getAllProWithCatId = (req, res) => {
    const id = req.query.id;
    Product.findAll({
      where: {productCategoryId: id},  
      attributes: ["id", "proPic", "proName", "proDescription", "quantity", "price", "brand", "origin",
        "productAt", "expireAt", "manual", "preserve", "productCategoryId"]
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

  exports.getOneWithDetail = (req, res) => {
    const id = req.query.id;
    Product.findAll({
      where: {id: id},  
      attributes: ["id", "proPic", "proName", "proDescription", "quantity", "price", "brand", "origin",
        "productAt", "expireAt", "manual", "preserve", "productCategoryId"]
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
