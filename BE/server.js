const express = require('express');
const cors = require('cors');

const app = express();
const db = require("./app/models");
const Role = db.role;

var corsOptions = {
  origin: "http://localhost:8081"
};
//use cors middleware
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//sequelize
db.sequelize.sync({force: true, logging: false}).then(() => {
    console.log('Drop and Resync Db');
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
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// //initial data in role
// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });
   
//     Role.create({
//       id: 2,
//       name: "moderator"
//     });
   
//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }