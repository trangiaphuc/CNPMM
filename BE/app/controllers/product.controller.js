const { product } = require('../models');
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
      .then(products => {
        logger.info(`Request status: ${res.status(200)} data ${products}`);
        res.status(200).send({products: products});
      })
      .catch(err => {
        logger.error(`Request status: ${res.status(500)} error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
  };

  //get all products with category id
exports.getAllProWithCatId = (req, res) => {
    const id = req.params.id;
    Product.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {productCategoryId: id},  
      attributes: ["id", "proPic", "proName", "proDescription", "quantity", "price", "brand", "origin",
        "productAt", "expireAt", "manual", "preserve", "productCategoryId"]
      })
      .then(products => {
        logger.info(`Request status: ${res.status(200)} data ${products}`);
        res.status(200).send({products: products});
      })
      .catch(err => {
        logger.error(`Request status: ${res.status(500)} error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
  };

  //get a product with an id from req.query
  exports.getOneWithDetail = (req, res) => {
    const id = req.params.id;
    Product.findOne({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {id: id},  
      attributes: ["id", "proPic", "proName", "proDescription", "quantity", "price", "brand", "origin",
        "productAt", "expireAt", "manual", "preserve", "productCategoryId"]
      })
      .then(product => {
        logger.info(`Request status: ${res.status(200)} data ${product}`);
        res.status(200).send({product: product});
      })
      .catch(err => {
        logger.error(`Request status: ${res.status(500)} error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
  };
