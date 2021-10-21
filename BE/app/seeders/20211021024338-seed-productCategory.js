'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'productCategories',
      [
        
        {
          catName: "Thịt, cá, hải sản",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Rau, củ, trái cây",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Đồ uống các loại",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Sữa uống các loại",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Bánh kẹo các loại",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Mì, cháo, phở bún",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Dầu ăn, gia vị",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Gạo, bột, đồ khô",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          catName: "Đồ mát, đông lạnh",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
    await queryInterface.bulkDelete('produCategories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
  }
};
