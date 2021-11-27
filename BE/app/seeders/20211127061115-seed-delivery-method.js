'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'deliveryMethods',
      [
        {
          "deliveryMethod": "Giao hàng tận nơi",
          "fee": 15000,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        // {
        //   "deliveryMethod": "Nhận tại cửa hàng",
        //   "fee": 0,
        //   "createdAt": new Date(),
        //   "updatedAt": new Date()
        // }
      ]);
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
