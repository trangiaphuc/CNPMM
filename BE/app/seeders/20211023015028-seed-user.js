'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          username: "phuctg",
          email: "phuctg@gmail.com",
          password: "$2a$08$cHFz5pbx3rAHkUHN/kYAEew.kTrcIFWhZe0baFf5z998JJfSREflC",
          firstname: "Trần Gia",
          lastname: "Phúc",
          phone: "0276601555",
          birthday: "2000-06-21",
          createdAt: new Date(),
          updatedAt: new Date(),
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
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
