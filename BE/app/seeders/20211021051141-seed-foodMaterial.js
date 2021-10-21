'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'foodMaterials',
      [

        {
          foodMaterialName: "hành tây",
          quantityDescription: "1/4 củ ",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "ớt sừng",
          quantityDescription: "1/2 quả ",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "tỏi",
          quantityDescription: "1 tép ",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "hành lá",
          quantityDescription: "vài nhánh",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "gừng",
          quantityDescription: "1 nhánh ",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "nước tương",
          quantityDescription: "",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "ớt bột",
          quantityDescription: "",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "bột gà",
          quantityDescription: "",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "muối",
          quantityDescription: "",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodMaterialName: "dầu ăn",
          quantityDescription: "",
          foodId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ], {});
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
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
