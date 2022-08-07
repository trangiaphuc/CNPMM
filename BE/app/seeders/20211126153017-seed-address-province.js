'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'address-provinces',
      [
        { province:"An Giang",createdAt: new Date(),"updatedAt": new Date()},
        { province:"Kon Tum",createdAt: new Date(),"updatedAt": new Date()},
        { province:"Bà Rịa – Vũng Tàu",createdAt: new Date(),"updatedAt": new Date()},
        { province:"Lai Châu",createdAt: new Date(),"updatedAt": new Date()},
        { province:"Bắc Giang",createdAt: new Date(),"updatedAt": new Date()},	
        { province:"Lâm Đồng",createdAt: new Date(),"updatedAt": new Date()},
    

 
    
      ])
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
