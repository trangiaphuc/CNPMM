const db = require('../models');
const Food = db.food;
const FoodMaterial = db.foodMaterial;
const FoodCookStep = db.foodCookStep;
const Image = db.image;
const logger = require('../winston/winston');
const fs = require('fs');

//get all food objects
exports.getAll = (req, res) => {
    Food.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      }
    })
      .then(foods => {
        logger.info(`Request status: ${res.status(200)}  data ${foods}`);
        foods.forEach(food =>{
          const image = fs.readFileSync(
            food.foodImage
          );
          var base64Image = Buffer.from(image).toString("base64");
          food.foodImage = "data:image/png;base64,"+base64Image;
        })
        res.status(200).send({foods: foods});
      })
      .catch(err => {
        logger.error(`Request: status: ${res.status(500)}  error ${err}`);
        res.status(500).send({
          message:
            err.message
        });
      });
  };

  //get a food detail from databse with a id from req.query
exports.getOneWithDetail = (req, res) => {
  const id = req.params.id;
  Food.findOne({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {id: id},
    include:[
      {
        model: FoodMaterial,
        attributes:['id', 'foodMaterialName', 'quantityDescription', 'productId'],
      }
    ]
  })
    .then(food => {
      logger.info(`Request status: ${res.status(200)} data ${food}`);
      const image = fs.readFileSync(
        food.foodImage
      );
      var base64Image = Buffer.from(image).toString("base64");
      food.foodImage = "data:image/png;base64,"+base64Image;

      res.status(200).send({food: food});
  })
  .catch(err => {
    logger.error(`Request status: ${res.status(500)} error ${err}`);
    res.status(500).send({
      message:
      err.message
    });
  });
};

exports.getFoodCookStepById = (req, res) => {
  const foodId = req.params.foodId;
  FoodCookStep.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where : {foodId : foodId},
  })
  .then(foodCookSteps=>{
    if(foodCookSteps)  
      {foodCookSteps.forEach(foodCookStep =>{
        const image = fs.readFileSync(
          foodCookStep.foodCookStepImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        foodCookStep.foodCookStepImage = "data:image/png;base64,"+base64Image;
      })

      res.status(200).send({foodCookSteps: foodCookSteps});
    }
    else{
      res.status(404).send({message: "Food Not found!"})
    }
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
}

//get all food with a category id
exports.getAllWithCatId = (req, res) => {
  const id = req.params.id;
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {foodCategoryId: id}
  })
    .then(foods => {
      logger.info(`Request status: ${res.status(200)} data ${foods}`);
      
      foods.forEach(food =>{
        const image = fs.readFileSync(
          food.foodImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        food.foodImage = "data:image/png;base64,"+base64Image;
      })

      res.status(200).send({foods: foods});
  })
  .catch(err => {
    logger.error(`Request status: ${res.status(500)} error ${err}`);
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.addNewFood = (req, res) => {
  Food.create({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    foodName: req.body.foodName,
    foodDescription: req.body.foodDescription,
    foodCalories: req.body.foodCalories,
    foodImage: __basedir + "/resources/static/assets/uploads/" + req.file.filename,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(food =>{
    if(food){

      const foodImage = fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      );
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + req.file.filename,
        // image.data
        foodImage
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