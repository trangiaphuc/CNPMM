const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./app/models");
const logger = require('./app/winston/winston')

var corsOptions = {
  origin: "http://localhost:19006"
};
//use cors middleware
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//sequelize
db.sequelize.sync({
  logging: (sql, queryObject) =>{
    logger.info(sql, queryObject);
  }, 
  force: true 
}).then(() => {
  logger.info("Dropped and Resync database");
    // initial();
});

//routes
//authentication and author routes
require('./app/routes/auth.routes')(app);
//user set up routes
require('./app/routes/user.routes')(app);
//food category routes
require('./app/routes/foodCategory.routes')(app);
//product category routes
require('./app/routes/productCategory.routes')(app);
//food routes
require('./app/routes/food.routes')(app);
//product routes
require('./app/routes/product.routes')(app);

// simple route
app.get("/", (req, res) => {
  logger.info("Wellcome to food and cook application")
  res.json({ message: "Welcome to food and cook application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}.`);
});


//initial data in role
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }