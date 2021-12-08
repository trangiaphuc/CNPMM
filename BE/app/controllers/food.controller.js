const db = require('../models');
const Food = db.food;
const FoodMaterial = db.foodMaterial;
const FoodCookStep = db.foodCookStep;
const Sequelize = require("sequelize");
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
            __basedir + food.foodImage
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
exports.getFoodDetailById = (req, res) => {
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
      },
      { 
        model: FoodCookStep,
        attributes:['id', 'stepNumber', 'stepDescription']
      }
    ]
  })
    .then(food => {
      logger.info(`Request status: ${res.status(200)} data ${food}`);
      const image = fs.readFileSync(
        __basedir + food.foodImage
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
          __basedir + foodCookStep.foodCookStepImage
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
          __basedir + food.foodImage
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

try{    
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const foodImage = fs.readFileSync(
      __basedir + "/resources/static/assets/images/food/" + req.file.filename
    );
    Food.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodName: req.body.foodName,
      foodDescription: req.body.foodDescription,
      foodCalories: req.body.foodCalories,
      foodImage: "/resources/static/assets/images/food/" + req.file.filename,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(food =>{
      if(food){
        fs.writeFileSync(
          __basedir + "/resources/static/assets/tmp/images/food/" + req.file.filename,
          // image.data
          foodImage
        );
        res.status(201).send({message: "Success!"})
      }
      else{
        res.status(500).send({message:"Fail!"});
      }
    })
  }
  catch(err) {
    res.status(500).send({message: err.message});
  }
}

exports.search = (req, res) =>{
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: Sequelize.literal('MATCH (foodName) AGAINST (:keyword)'),
    replacements: {
      keyword: req.body.keyword
    }
  })
  .then(foods => {
    if(foods){
      
      foods.forEach(food =>{
        const image = fs.readFileSync(
          __basedir + food.foodImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        food.foodImage = "data:image/png;base64,"+base64Image;
      })
      
      res.status(200).send({foods: foods})
    }
    else{
      res.status(404).send({message: 'Food Not Found!'});
    }
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
}

//show food Material to note list and cart listCartItems
exports.extractFoodMaterial = (req, res) =>{
  const foodId = req.params.foodId;
  Food.findOne({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {id: foodId},
    include:[
      {
        model: FoodMaterial,
        attributes:['id', 'foodMaterialName', 'quantityDescription', 'productId'],
      }
    ]
  })
  .then(food =>{
    if(food){
      var foodMaterials = food.foodMaterials;
      var listMarketNoteItems = [];
      var listCartItems = [];
      foodMaterials.forEach(foodMaterial =>{
        if(foodMaterial.productId != null){
          listCartItems.push(foodMaterial);
          foodMaterial.setDataValue('isDone', true);
          listMarketNoteItems.push(foodMaterial);
          // console.log(listMarketNoteItems)
        }
        else{
          foodMaterial.setDataValue('isDone', false);
          listMarketNoteItems.push(foodMaterial);
        }
      })
      res.status(200).send({
        listCartItems: listCartItems, 
        listMarketNoteItems: listMarketNoteItems
      })
    }
    else{
      res.status(400).send({message: "Not Found!"});
    }
  })
  .catch(err =>{
    res.status(500).send({message: err.message});
  })
}

exports.getAllFavoriteFood = (req, res) => {
  const listFavoriteFoodCategory = req.body.listFavoriteFoodCategory;
  // res.send({listFavoriteFoodCategory});
  var favoriteFoods = [];
  var count =0;
  listFavoriteFoodCategory.forEach(foodCategory => {
    Food.findAll({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {foodCategoryId: foodCategory.id},
      order: Sequelize.literal('rand()'),
      limit: 3
    })
    .then(foods =>{
      count = count + 1;
      foods.forEach(food =>{
        
        const image = fs.readFileSync(
          __basedir + food.foodImage
        );
        var base64Image = Buffer.from(image).toString("base64");
        food.foodImage = "data:image/png;base64,"+base64Image;

        favoriteFoods.push(food);
      })
      if(count == listFavoriteFoodCategory.length) {
        res.send({favoriteFoods: favoriteFoods});
      }
    })
  })
}