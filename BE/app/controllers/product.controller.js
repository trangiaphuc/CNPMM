const db = require('../models');
const Product = db.product;
const logger = require('../winston/winston');
const Sequelize = require("sequelize");
const fs = require('fs');

//get all products
exports.getAll = (req, res) => {
    Product.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
        },
      }
    )
    .then(products => {
      logger.info(`Request status: ${res.status(200)} data ${products}`);

      products.forEach(product =>{
        const image = fs.readFileSync(
          __basedir + product.productImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        product.productImage = "data:image/png;base64,"+base64Image;
      });

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
      })
      .then(products => {
        logger.info(`Request status: ${res.status(200)} data ${products}`);
        products.forEach(product =>{
          const image = fs.readFileSync(
            __basedir + product.productImage
          );
          var base64Image = Buffer.from(image).toString("base64");
          product.productImage = "data:image/png;base64,"+base64Image;
        });
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
      })
      .then(product => {
        logger.info(`Request status: ${res.status(200)} data ${product}`);
        
        const image = fs.readFileSync(
          __basedir + product.productImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        product.productImage = "data:image/png;base64,"+base64Image;

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

  exports.addNewProduct = (req, res) => {

    Product.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      proName: req.body.proName,
      proDescription: req.body.proDescription,
      quantity: req.body.quantity,
      price: req.body.price,
      brand: req.body.brand,
      origin: req.body.origin,
      productAt: req.body.productAt,
      expireAt: req.body.expireAt,
      manual: req.body.manual,
      preserve: req.body.preserve,
      productImage: __basedir + "/resources/static/assets/images/product/" + req.file.filename,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(product =>{
      if(product)
      {  const productImage = fs.readFileSync(
          "/resources/static/assets/images/product/" + req.file.filename
        );
        fs.writeFileSync(
          "/resources/static/assets/tmp/images/product/" + req.file.filename,
          // image.data
          productImage
        );
        res.status(201).send({message: "Success!"})
      }
      else{
        res.status(500).send({message:"Fail!"});
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    })
  }

  exports.search = (req, res) =>{
    Product.findAll({
      where: Sequelize.literal('MATCH (proName) AGAINST (:keyword)'),
      replacements: {
        keyword: req.query.keyword
      }
    })
    .then(products => {
      if(products){
        products.forEach(product =>{
          const image = fs.readFileSync(
            __basedir + product.productImage
          );
          var base64Image = Buffer.from(image).toString("base64");
          product.productImage = "data:image/png;base64,"+base64Image;
        });
        res.status(200).send({products: products})
      }
      else{
        res.status(404).send({message: 'Product Not Found!'});
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    })
  }