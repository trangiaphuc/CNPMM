'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user_roles',
      [
        {
          userId: "1",
          roleId: "1",
          createdAt: new Date(),"updatedAt": new Date()
        },
        {
          userId: "1",
          roleId: "2",
          createdAt: new Date(),"updatedAt": new Date()
        },
        {
          userId: "2",
          roleId: "1",
          createdAt: new Date(),"updatedAt": new Date()
        }
      ]
    )
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
