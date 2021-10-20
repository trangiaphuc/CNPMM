module.exports = (sequelize, Sequelize) => {
    const foodCategory = sequelize.define("foodCategories", {
      catName: {
        type: Sequelize.STRING
      }
    });
  
    return foodCategory;
  };