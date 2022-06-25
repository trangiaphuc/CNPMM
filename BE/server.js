const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const logger = require("./app/winston/winston");

// var corsOptions = {
//   origin: "http://localhost:19006",
// };

global.__basedir = __dirname;

//use cors middleware
app.use(cors());
// app.use(cors());
// app.options("*", cors());
//app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//sequelize
db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
db.sequelize
  .sync({
    logging: (sql, queryObject) => {
      logger.info(sql, queryObject);
    },
    force: true,
  })
  .then(() => {
    logger.info("Dropped and Resync database");
    // initial();
  });

//routes
//authentication and author routes
require("./app/routes/auth.routes")(app);
//user set up routes
require("./app/routes/user.routes")(app);
//food category routes
require("./app/routes/foodCategory.routes")(app);
//product category routes
require("./app/routes/productCategory.routes")(app);
//food routes
require("./app/routes/food.routes")(app);
//product routes
require("./app/routes/product.routes")(app);
//cart routes
require("./app/routes/cart.routes")(app);
//images routes
// require('./app/routes/image.routes')(app);
//paymentMethod
require("./app/routes/paymentMethod.routes")(app);
//deliveryMethod
require("./app/routes/deliveryMethod.routes")(app);
//orders routes
require("./app/routes/order.routes")(app);
//market note zone
require("./app/routes/marketNote.routes")(app);
//images Zone
require("./app/routes/images.routes")(app);

// simple route
app.get("/", (req, res) => {
  logger.info("Wellcome to food and cook application");
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
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
