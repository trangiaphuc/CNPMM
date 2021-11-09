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
//ver 2
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.cart = require("../models/cart.model.js")(sequelize, Sequelize);
db.cartDetail = require("../models/cartDetail.model.js")(sequelize, Sequelize);
db.deliveryStatusType = require("../models/delivery.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.orderDetail = require("../models/orderDetail.model.js")(sequelize, Sequelize);
db.paymentMethod = require("../models/paymentMethod.model.js")(sequelize, Sequelize);
db.shipper = require("../models/shipper.model.js")(sequelize, Sequelize);

//many to many table
db.favoritesFoodCategory = sequelize.define('favoriteFoodCategories');

//
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

// db.user.belongsToMany(db.foodCategory, {
//   through: "favoriteFoodCategories",
//   foreignKey:"userId", 
//   otherKey:"foodCategoryId"
// });

// db.foodCategory.belongsToMany(db.user,{
//   through: "favoriteFoodCategories",
//   foreignKey:"foodCategoryId",
//   otherKey: "userId"
// });

db.user.belongsToMany(db.foodCategory, {through: db.favoritesFoodCategory});
db.foodCategory.belongsToMany(db.user, {through: db.favoritesFoodCategory})


db.user.hasOne(db.address);
db.foodCategory.hasMany(db.food);
db.food.hasMany(db.foodMaterial);
db.food.hasMany(db.foodCookStep);
db.productCategory.hasMany(db.product);
db.quantity.hasOne(db.product);
db.product.hasOne(db.foodMaterial);
//ver 2
db.user.hasOne(db.cart);
db.cart.hasMany(db.cartDetail);
db.cartDetail.belongsTo(db.product);
db.user.hasMany(db.order);
db.deliveryStatusType.hasMany(db.order);
db.shipper.hasMany(db.order);
db.paymentMethod.hasMany(db.order);
db.order.hasMany(db.orderDetail);
db.product.hasMany(db.orderDetail);
db.shipper.hasOne(db.address);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;