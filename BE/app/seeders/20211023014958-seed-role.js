'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles',
      [
      {
          name: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        name: "merchant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "moderator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "shipper",
        createdAt: new Date(),
        updatedAt: new Date(),
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
