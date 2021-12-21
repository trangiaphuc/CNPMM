const db = require('../models');
const FoodCategory = db.foodCategory;
const fs = require('fs');
const logger = require('../winston/winston');


//get all food categories
exports.userGetAllFoodCategories = (req, res) => {
  FoodCategory.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    attributes: ['id', 'catName', 'catIcon'],
    where: {isShowing: true}
  })
    .then(foodCategories => {
      logger.info(`Request status: ${res.status(200)} data ${foodCategories}`);
      foodCategories.forEach(foodCategory =>{          
        if(foodCategory.catIcon != null )
        {  
          const image = fs.readFileSync(
            __basedir + foodCategory.catIcon
          );
          var base64Image = Buffer.from(image).toString("base64");
          foodCategory.catIcon = "data:image/png;base64,"+base64Image;
        }
      });
      res.status(200).send({foodCategories: foodCategories});
    })
    .catch(err => {
      logger.error(`Request status: ${res.status(500)} error ${err}`);
      res.status(500).send({
        message:
          err.message
      });
  });
};

exports.merchantGetAllFoodCategories = (req, res) => {
  FoodCategory.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    attributes: ['id', 'catName', 'catIcon'],
  })
    .then(foodCategories => {
      logger.info(`Request status: ${res.status(200)} data ${foodCategories}`);
      foodCategories.forEach(foodCategory =>{          
        if(foodCategory.catIcon != null)
        {
          const image = fs.readFileSync(
            __basedir + foodCategory.catIcon
          );
          var base64Image = Buffer.from(image).toString("base64");
          foodCategory.catIcon = "data:image/png;base64,"+base64Image;
        }
      });
      res.status(200).send({foodCategories: foodCategories});
    })
    .catch(err => {
      logger.error(`Request status: ${res.status(500)} error ${err}`);
      res.status(500).send({
        message:
          err.message
      });
  });
};


exports.merchantAddNewFoodCategory = (req, res) =>{
  try{    
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const foodCategoryIcon = fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );

    FoodCategory.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      catName: req.body.catName,
      catIcon: "/resources/static/assets/icon/foodCategoryIcon/" + req.file.filename,
      isShowing: req.body.isShowing,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(foodCategory =>{
      if(foodCategory){
        fs.writeFileSync(
          __basedir + "/resources/static/assets/icon/foodCategoryIcon/" + req.file.filename,
          // image.data
          foodCategoryIcon
        );
        logger.info(`Request status: ${res.status(201)} Created!`);
        res.status(201).send({message: "Success!", data: foodCategory})
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
  catch (err) {
    res.status(500).send({ message: err.message});
  }
}


exports.merchantUpdateFoodCategory = (req, res) =>{
  try{    
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const foodCategoryIcon = fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );
    FoodCategory.findOne({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {id: req.params.id}
    })
    .then(foodCategory =>     {      
      foodCategory.update({
        logging: (sql, queryObject) =>{
          logger.info(sql, queryObject);
        },
        catName: req.body.catName,
        catIcon: "/resources/static/assets/icon/foodCategoryIcon/" + req.file.filename,
        isShowing: req.body.isShowing,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then(foodCategory =>{
        if(foodCategory){
          fs.writeFileSync(
            __basedir + "/resources/static/assets/icon/foodCategoryIcon/" + req.file.filename,
            // image.data
            foodCategoryIcon
          );
          logger.info(`Request status: ${res.status(201)} Created!`);
          res.status(201).send({message: "Success!", data: foodCategory})
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
  catch (err) {
    res.status(500).send({ message: err.message});
  }
}