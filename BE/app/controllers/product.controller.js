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
exports.userGetAllProWithCatId = (req, res) => {
    const id = req.params.id;
    Product.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {
        productCategoryId: id,
        isSelling: true,
      },  
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


  exports.userSearch = (req, res) =>{
    Product.findAll({
      where: Sequelize.literal('MATCH (proName) AGAINST (:keyword)'),
      replacements: {
        keyword: req.body.keyword
      }
    })
    .then(products => {
      if(products){

        var searchResults = [];

        products.forEach(product =>{
          if(product.isSelling == true){
            const image = fs.readFileSync(
              __basedir + product.productImage
            );
            var base64Image = Buffer.from(image).toString("base64");
            product.productImage = "data:image/png;base64,"+base64Image;

            searchResults.push(product);
          }
        });
        res.status(200).send({products: searchResults})
      }
      else{
        res.status(404).send({message: 'Product Not Found!'});
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    })
  }

exports.merchantGetAllProWithCatId = (req, res) => {
  const id = req.params.id;
  Product.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {
      productCategoryId: id,
    },  
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
        res.status(500).send({message:err.message});
  });
};

exports.merchantAddNewProduct = (req, res) => {
  try
  { 
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }  
    const productImage = fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );

    Product.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      proName: req.body.proName,
      proDescription: req.body.proDescription,
      quantityValue: req.body.quantityValue,
      price: req.body.price,
      brand: req.body.brand,
      origin: req.body.origin,
      productAt: req.body.productAt,
      expireAt: req.body.expireAt,
      manual: req.body.manual,
      preserve: req.body.preserve,
      productImage: "/resources/static/assets/images/product/" + req.file.filename,
      productCategoryId: req.body.productCategoryId,
      isSelling: req.body.isSelling,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(product =>{
        fs.writeFileSync(
          __basedir + "/resources/static/assets/images/product/" + req.file.filename,
          // image.data
          productImage
        );
        res.status(201).send({message: "Success!"})
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    })
  }
  catch(err) {
    logger.error(`Request status: ${res.status(500)}  error ${err}`);
    res.status(500).send({message: err.message});
  }
}

exports.merchantUpdateProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findOne({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {id: productId}
  })
  .then(product => {
    console.log(product);
    console.log(req.body.proName);
    product.update({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      proName: req.body.proName,
      proDescription: req.body.proDescription,
      quantityValue: req.body.quantityValue,
      price: req.body.price,
      brand: req.body.brand,
      origin: req.body.origin,
      productAt: req.body.productAt,
      expireAt: req.body.expireAt,
      manual: req.body.manual,
      preserve: req.body.preserve,
      isSelling: req.body.isSelling,
      productCategory: req.body.productCategory,
      updatedAt: new Date(),
    })
    .then(updatedItem => {
      if(updatedItem){
        res.status(200).send({message: 'Success!'});
      }
      else{
        res.status(500).send({message:"Fail!"});
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
}

exports.merchantUpdateProductImage = (req, res) => {
  const productId = req.params.productId;
  try{    
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      const productImage = fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      );
      Product.findOne({
        logging: (sql, queryObject) =>{
          logger.info(sql, queryObject);
        },
        where: {id: productId}
      })
      .then(product =>{
        product.update({
          logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          productImage: "/resources/static/assets/images/product/" + req.file.filename,
          updatedAt: new Date(),
        })
        .then(product =>{
          
            console.log(req.file.filename);
            fs.writeFileSync(
              __basedir + "/resources/static/assets/images/product/" + req.file.filename,
              // image.data
              productImage
            );
            logger.info(`Request status: ${res.status(201)} Created!`);
            res.status(201).send({message: "Success!"})
         
        })
      })
    }
    catch(err) {
      logger.error(`Request status: ${res.status(500)}  error ${err}`);
      res.status(500).send({message: err.message});
    }
}


exports.merchantSearch = (req, res) =>{
  Product.findAll({
    where: Sequelize.literal('MATCH (proName) AGAINST (:keyword)'),
    replacements: {
      keyword: req.body.keyword
    }
  })
  .then(products => {
    if(products){

      var searchResults = [];

      products.forEach(product =>{
       
        const image = fs.readFileSync(
          __basedir + product.productImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        product.productImage = "data:image/png;base64,"+base64Image;

        searchResults.push(product);
        
      });
      res.status(200).send({products: searchResults})
    }
    else{
      res.status(404).send({message: 'Product Not Found!'});
    }
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
}

exports.merchantGetAllProWithCatId = (req, res) => {
const id = req.params.id;
Product.findAll({
  logging: (sql, queryObject) =>{
    logger.info(sql, queryObject);
  },
  where: {
    productCategoryId: id,
  },  
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
      res.status(500).send({message:err.message});
});
};