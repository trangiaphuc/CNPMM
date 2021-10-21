'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert(
      'foodCategories',
      [
        {
          catName: "Món chay",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món bún, phở",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món canh, nấu",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món giò, chả",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món gỏi, nộm",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món hầm, súp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món hấp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món kho",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món lẩu",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món luộc",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món muối chua",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món nướng",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món rán, chiên",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món rang",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món xào",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          catName: "Món xôi, cháo",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     
     */
     await queryInterface.bulkDelete('foodcategories', null, {});
  }
};
