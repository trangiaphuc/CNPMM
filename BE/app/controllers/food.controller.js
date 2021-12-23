const db = require('../models');
const Food = db.food;
const FoodMaterial = db.foodMaterial;
const FoodCookStep = db.foodCookStep;
const Product = db.product;
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
exports.userGetAllWithCatId = (req, res) => {
  const id = req.params.id;
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {
      foodCategoryId: id,
      isShowing: true,
    }
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


exports.userSearch = (req, res) =>{
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: Sequelize.literal('MATCH (foodName) AGAINST (:keyword)'),
    // where: {isShowing: true},
    replacements: {
      keyword: req.body.keyword
    }
  })
  .then(foods => {
    if(foods){
      
      var searchResults = [];
      foods.forEach(food =>{
        if(food.isShowing == true){
          const image = fs.readFileSync(
            __basedir + food.foodImage
          );
          var base64Image = Buffer.from(image).toString("base64");
          food.foodImage = "data:image/png;base64,"+base64Image;
          searchResults.push(food)
        }
      })
      
      logger.info(`Request status: ${res.status(200)} data ${searchResults}`);
      res.status(200).send({foods: searchResults})
    }
    else{
      logger.error(`Request status: ${res.status(404)}  Not found`);
      res.status(404).send({message: 'Food Not Found!'});
    }
  })
  .catch(err => {
    logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
        include: [
          {
            model: Product,
          }
        ]
      }
    ]
  })
  .then((food)=>{
    if(food){
      var foodMaterials = food.foodMaterials;
      var listMarketNoteItems = [];
      var listCartItems = [];
      foodMaterials.forEach( async (foodMaterial) =>{
        if(foodMaterial.productId != null){
          
          listCartItems.push(foodMaterial);
          foodMaterial.setDataValue('isDone', true);
          listMarketNoteItems.push(foodMaterial);
          // console.log(product);
          // console.log(listMarketNoteItems)
        }
        else{
          foodMaterial.setDataValue('isDone', false);
          listMarketNoteItems.push(foodMaterial);
        }
      })
      logger.info(`Request status: ${res.status(200)} data ${listCartItems} ${listMarketNoteItems}`);
      res.status(200).send({
        listCartItems: listCartItems, 
        listMarketNoteItems: listMarketNoteItems
      })
    }
    else{
      logger.error(`Request status: ${res.status(404)}  Not found`);
      res.status(404).send({message: "Not Found!"});
    }
  })
  .catch(err =>{
    logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
        logger.info(`Request status: ${res.status(201)} Created!`);
        res.send({favoriteFoods: favoriteFoods});
      }
    })
    .catch(error => {
      logger.error(`Request status: ${res.status(500)}  error ${error}`);
    })
  })
}

exports.merchantGetAllWithCatId = (req, res) => {
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

// exports.merchantAddNewFood = (req, res) => {
// try{    
//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }
//     const foodImage = fs.readFileSync(
//       __basedir + "/resources/static/assets/uploads/" + req.file.filename
//     );
//     Food.create({
//       logging: (sql, queryObject) =>{
//         logger.info(sql, queryObject);
//       },
//       foodName: req.body.foodName,
//       foodDescription: req.body.foodDescription,
//       foodCalories: req.body.foodCalories,
//       foodCategoryId: req.body.foodCategoryId,
//       foodImage: "/resources/static/assets/images/food/" + req.file.filename,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     })
//     .then(food =>{
//       if(food){
//         fs.writeFileSync(
//           __basedir + "/resources/static/assets/images/food/" + req.file.filename,
//           // image.data
//           foodImage
//         );

//         console.log({"foodDes ":req.foodDescription});
//         FoodDes =  new Object(food.foodDescription);
//         console.log(FoodDes.id, FoodDes);


//         logger.info(`Request status: ${res.status(201)} Created!`);
//         res.status(201).send({message: "Success!", data: food})
//       }
//       else{
//         logger.error(`Request status: ${res.status(500)}  error `);
//         res.status(500).send({message:"Fail!"});
//       }
//     })
//   }
//   catch(err) {
//     logger.error(`Request status: ${res.status(500)}  error ${err}`);
//     res.status(500).send({message: err.message});
//   }
// }


exports.merchantAddNewFood = (req, res) => {
try{    
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    
    const foodMaterials = req.body.foodMaterials;
    const foodCookSteps = req.body.foodCookSteps;

    const foodImage = fs.readFileSync(
      __basedir + "/resources/static/assets/uploads/" + req.file.filename
    );
    Food.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodName: req.body.foodName,
      foodDescription: req.body.foodDescription,
      foodCalories: req.body.foodCalories,
      foodCategoryId: req.body.foodCategoryId,
      iShowing: true,
      foodImage: "/resources/static/assets/images/food/" + req.file.filename,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then( async (food) =>{
      if(food){
        fs.writeFileSync(
          __basedir + "/resources/static/assets/images/food/" + req.file.filename,
          // image.data
          foodImage
        );

        // console.log({"foodDes ":req.foodDescription});
        // FoodDes =  new Object(food.foodDescription);
        // console.log(FoodDes.id, FoodDes);


        // logger.info(`Request status: ${res.status(201)} Created!`);
        // res.status(201).send({message: "Success!", data: food})
        var flag = true;

        await foodMaterials.forEach(foodMaterial =>{
          FoodMaterial.create({
            logging: (sql, queryObject) =>{
              logger.info(sql, queryObject);
            },
            foodId: foodId,
            foodMaterialName: foodMaterial.foodMaterialName,
            quantityDescription: foodMaterial.quantityDescription,
            quantityValue: foodMaterial.quantityValue,
            productId: foodMaterial.productId,
            quantityId: foodMaterial.quantityId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .catch(err => {
            if(err){
              flag = false;
              console.error(err);
            }
          })
        })

        await foodCookSteps.forEach(foodCookStep => {
          FoodCookStep.create({
            logging: (sql, queryObject) =>{
              logger.info(sql, queryObject);
            },
            foodId: foodId,
            stepNumber: foodCookStep.stepNumber,
            stepDescription: foodCookStep.stepDescription,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .catch(err => {
            if(err){
              flag = false;
              console.error(err);
            }
          })
        })

        if(flag === true){
          res.status(200).send({message: 'Success!'} )
        }
        else{
          res.status(500).send( {message: 'Fail!'});
        }


      }
      else{
        logger.error(`Request status: ${res.status(500)}  error `);
        res.status(500).send({message:"Fail!"});
      }
    })
  }
  catch(err) {
    logger.error(`Request status: ${res.status(500)}  error ${err}`);
    res.status(500).send({message: err.message});
  }
}

exports.merchantAddNewFoodDetails = async (req, res) => {
  const foodId = req.params.foodId;
  const foodMaterials = req.body.foodMaterials;
  const foodCookSteps = req.body.foodCookSteps;

  var flag = true;

  await foodMaterials.forEach(foodMaterial =>{
    FoodMaterial.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodId: foodId,
      foodMaterialName: foodMaterial.foodMaterialName,
      quantityDescription: foodMaterial.quantityDescription,
      quantityValue: foodMaterial.quantityValue,
      productId: foodMaterial.productId,
      quantityId: foodMaterial.quantityId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .catch(err => {
      if(err){
        flag = false;
        console.error(err);
      }
    })
  })

  await foodCookSteps.forEach(foodCookStep => {
    FoodCookStep.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodId: foodId,
      stepNumber: foodCookStep.stepNumber,
      stepDescription: foodCookStep.stepDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .catch(err => {
      if(err){
        flag = false;
        console.error(err);
      }
    })
  })

  if(flag === true){
    res.status(200).send({message: 'Success!'} )
  }
  else{
    res.status(500).send( {message: 'Fail!'});
  }

}

exports.merchantSearch = (req, res) =>{
  Food.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: Sequelize.literal('MATCH (foodName) AGAINST (:keyword)'),
    // where: {isShowing: true},
    replacements: {
      keyword: req.body.keyword
    }
  })
  .then(foods => {
    if(foods){
      
      var searchResults = [];
      foods.forEach(food =>{
       
          const image = fs.readFileSync(
            __basedir + food.foodImage
          );
          var base64Image = Buffer.from(image).toString("base64");
          food.foodImage = "data:image/png;base64,"+base64Image;
          searchResults.push(food)
        
      })
      
      logger.info(`Request status: ${res.status(200)} data ${searchResults}`);
      res.status(200).send({foods: searchResults})
    }
    else{
      logger.error(`Request status: ${res.status(404)}  Not found`);
      res.status(404).send({message: 'Food Not Found!'});
    }
  })
  .catch(err => {
    logger.error(`Request status: ${res.status(500)}  error ${err}`);
    res.status(500).send({message: err.message});
  })
}

exports.merchantUpdateFood = async (req, res) => {
  const foodId = req.params.foodId;
  const newFoodCookSteps = req.body.foodCookSteps;
  const newFoodMaterials = req.body.foodMaterials;
  var flag = true;

  Food.findOne({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where:{id: foodId}
  })
  .then(food => {
    food.update({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodName: req.body.foodName,
      foodDescription: req.body.foodDescription,
      foodCalories: req.body.foodCalories,
      isShowing: req.body.isShowing,
      foodCategoryId: req.body.foodCategoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .catch(err => {
      if(err){
        flag = false;
      }
    })
  })

  await FoodMaterial.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {foodId: foodId}
  })
  .then(foodMaterials =>{
    foodMaterials.forEach(foodMaterial =>{
      foodMaterial.destroy();
    })
  })
  .catch(err=>{
    if(err)
    {flag = false;}
  })

  await FoodCookStep.findAll({
    logging: (sql, queryObject) =>{
      logger.info(sql, queryObject);
    },
    where: {foodId : foodId}
  })
  .then(foodCookSteps =>{
    foodCookSteps.forEach(foodCookStep =>{
      foodCookStep.destroy();
    })
  })
  .catch(err=>{
    if(err)
    {flag = false;}
  })


  
  await newFoodMaterials.forEach(foodMaterial =>{
    FoodMaterial.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodId: foodId,
      foodMaterialName: foodMaterial.foodMaterialName,
      quantityDescription: foodMaterial.quantityDescription,
      quantityValue: foodMaterial.quantityValue,
      productId: foodMaterial.productId,
      quantityId: foodMaterial.quantityId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .catch(err => {
      if(err){
        flag = false;
      }
    })
  })

  await newFoodCookSteps.forEach(foodCookStep =>{
    FoodCookStep.create({
      logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      foodId: foodId,
      stepNumber: foodCookStep.stepNumber,
      stepDescription: foodCookStep.stepDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .catch(err=>{
      if(err){
        flag = false;
      }
    })
  })

  if(flag){
    res.status(200).send( {message:"Success!"})
  }
  else{
    res.status(500).send( {message:"Fail!"});
  }
}


exports.merchantUpdateFoodImage = (req, res) => {
  const foodId = req.params.foodId;
  try{    
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      const foodImage = fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      );
      Food.findOne({
        logging: (sql, queryObject) =>{
          logger.info(sql, queryObject);
        },
        where: {id: foodId}
      })
      .then(food =>{
        food.update({
          logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          foodImage: "/resources/static/assets/images/food/" + req.file.filename,
          updatedAt: new Date(),
        })
        .then(food =>{
          if(food){
            fs.writeFileSync(
              __basedir + "/resources/static/assets/images/food/" + req.file.filename,
              // image.data
              foodImage
            );
            logger.info(`Request status: ${res.status(201)} Created!`);
            res.status(201).send({message: "Success!", data: food})
          }
          else{
            logger.error(`Request status: ${res.status(500)}  error `);
            res.status(500).send({message:"Fail!"});
          }
        })
      })
    }
    catch(err) {
      logger.error(`Request status: ${res.status(500)}  error ${err}`);
      res.status(500).send({message: err.message});
    }
  }
