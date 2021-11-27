'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert(
      'foodCategories',
      [
        {
          catName: "Món chay",
          createdAt: new Date(),
          updatedAt: new Date(),
          catIcon: "/resources/static/assets/icon/foodCategoryIcon/vegetarian.png",
        },
        {
          catName: "Món canh",
          createdAt: new Date(),
          updatedAt: new Date(),
          catIcon: "/resources/static/assets/icon/foodCategoryIcon/soup.png",
        },
        {
          catName: "Món chiên, xào",
          createdAt: new Date(),
          updatedAt: new Date(),
          catIcon: "/resources/static/assets/icon/foodCategoryIcon/fried.png",
        },
        {
          catName: "Món nướng",
          createdAt: new Date(),
          updatedAt: new Date(),
          catIcon: "/resources/static/assets/icon/foodCategoryIcon/grill.png",
        },
        {
          catName: "Bánh kẹo",
          createdAt: new Date(),
          updatedAt: new Date(),
          catIcon: "/resources/static/assets/icon/foodCategoryIcon/cake.png",
        },
      ], {})

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('foodcategories', null, {});
  }
};
