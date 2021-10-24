const db = require('../models');
const Product = db.product;
const logger = require('../winston/winston');

//get all products
exports.getAll = (req, res) => {
    Product.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
        attributes: ["id", "proPic", "proName", "proDescription", "quantity", "price", "brand", "origin",
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
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
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
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
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
