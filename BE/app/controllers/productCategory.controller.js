const db = require('../models');
const ProductCategory = db.productCategory;
const logger = require('../winston/winston');
const fs = require('fs');
//get all products category
exports.usergetAllProductsCategory = (req, res) => {
    ProductCategory.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {isShowing: true}
    })
      .then(productCategories => {
        productCategories.forEach(productCategory =>{          
          if(productCategory.catIcon != null)
          { 
            const image = fs.readFileSync(
              __basedir + productCategory.catIcon
            );
            var base64Image = Buffer.from(image).toString("base64");
            productCategory.catIcon = "data:image/png;base64,"+base64Image;
          }
        });
        logger.info(`Request status: ${res.status(200)} data ${productCategories}`);
        res.status(200).send({ productCategories: productCategories });
      })
      .catch(err => {
        logger.error(`Request status: ${res.status(500)} error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
};

exports.merchantgetAllProductsCategory = (req, res) => {
  ProductCategory.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    }
  })
    .then(productCategories => {
      productCategories.forEach(productCategory =>{          
        if(productCategory.catIcon != null)
        { 
          const image = fs.readFileSync(
            __basedir + productCategory.catIcon
          );
          var base64Image = Buffer.from(image).toString("base64");
          productCategory.catIcon = "data:image/png;base64,"+base64Image;
        }
      });
      logger.info(`Request status: ${res.status(200)} data ${productCategories}`);
      res.status(200).send({ productCategories: productCategories });
    })
    .catch(err => {
      logger.error(`Request status: ${res.status(500)} error ${err}`);
      res.status(500).send({
        message:
          err.message
      });
    });
};

exports.merchantAddNewProductCategory = (req, res) =>{

    ProductCategory.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      catName: req.body.catName,
      catIcon: "",
      isShowing: req.body.isShowing,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(productCategory =>{
      if(productCategory){
        logger.info(`Request status: ${res.status(201)} Created!`);
        res.status(201).send({message: "Success!", data: productCategory})
      }
      else{
        logger.error(`Request status: ${res.status(500)}  error `);
        res.status(500).send({message:"Fail!"});
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })
}


exports.merchantUpdateProductCategory = (req, res) =>{
    ProductCategory.findOne({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {id: req.params.id}
    })
    .then(productCategory =>     {      
      productCategory.update({
        logging: (sql, queryObject) =>{
          logger.info(sql, queryObject);
        },
        catName: req.body.catName,
        catIcon: "",
        isShowing: req.body.isShowing,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then(productCategory =>{
        if(productCategory){
          logger.info(`Request status: ${res.status(201)} Created!`);
          res.status(201).send({message: "Success!", data: productCategory})
        }
        else{
          logger.error(`Request status: ${res.status(500)}  error `);
          res.status(500).send({message:"Fail!"});
        }
      })
      .catch(err => {
        res.status(500).send({message: err.message})
      })
    })
    .catch(err => {
      res.status(500).send({message:err.message});
    })
}







