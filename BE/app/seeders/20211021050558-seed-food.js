'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'foods',
      [

        {
          foodCategoryId: 1 ,
          foodName: "Món khoai môn xào chay ngon bất ngờ!",
          foodDescription: "Nếu bạn thường xuyên ăn các món chay hay chế biến các món chay vào ngày rằm, mồng một thì sao bạn không thử ngay món khoai môn xào chay này nhỉ?",
          foodCalories: "NaN",
          foodImage: "D:\\git\\CNPMM\\BE/resources/static/assets/tmp/male.png",
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
