module.exports = (sequelize, Sequelize) => {
    const FoodCategory = sequelize.define("foodCategories", {
      catName: {
        type: Sequelize.STRING
      }
    });
  
    return FoodCategory;
  };