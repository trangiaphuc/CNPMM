module.exports = (sequelize, Sequelize) => {
    const FoodCategory = sequelize.define("foodCategories", {
      catName: {
        type: Sequelize.TEXT
      },
      catIcon: {
        type: Sequelize.TEXT
      },
      isShowing:{
        type: Sequelize.BOOLEAN
      }
    });
  
    return FoodCategory;
};