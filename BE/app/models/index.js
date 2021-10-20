const config = require('../config/db.config.js');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.address = require("../models/address.model.js")(sequelize, Sequelize);
db.foodCategory = require("../models/foodCategory.model.js")(sequelize, Sequelize);
db.food = require("../models/food.model.js")(sequelize, Sequelize);
db.foodMaterial = require("../models/foodMaterial.model.js")(sequelize, Sequelize);
db.quantity = require("../models/quantity.model.js")(sequelize, Sequelize);
db.foodCookStep = require("../models/foodCookStep.model.js")(sequelize, Sequelize);
db.productCategory = require("../models/productCategory.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.belongsToMany(db.foodCategory, {
  through: "favoriteFoodCategories",
  foreignKey:"userId", 
  otherKey:"foodCategoryId"
});

db.foodCategory.belongsToMany(db.user,{
  through: "favoriteFoodCategories",
  foreignKey:"foodCategoryId",
  otherKey: "userId"
});

db.user.hasOne(db.address);
db.foodCategory.hasMany(db.food);
db.food.hasMany(db.foodMaterial);
db.quantity.hasOne(db.foodMaterial);
db.food.hasMany(db.foodCookStep);
db.productCategory.hasMany(db.product);
db.quantity.hasOne(db.product);
db.product.hasOne(db.foodMaterial);


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;