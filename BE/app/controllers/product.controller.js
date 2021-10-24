const db = require('../models');
const Product = db.product;

//get all products
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

  //get all products with category id
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

  //get a product with an id from req.query
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
