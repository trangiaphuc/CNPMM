'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'paymentMethods',
      [
        {
          "paymentType": "Thanh toán khi nhận hàng",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "paymentType": "Chuyển khoản Online",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ]);
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
