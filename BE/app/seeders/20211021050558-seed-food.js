'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'foods',
      [

        {
          foodCategoryId: 1 ,
          foodName: "Giò lụa chay",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/gioluachay.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 1 ,
          foodName: "Miến xào chay thập cẩm",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/mienxaothapcam.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 1 ,
          foodName: "Súp bí đỏ",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/supbido.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 1 ,
          foodName: "Canh nấm hạt sen",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhnamhatsen.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 1 ,
          foodName: "Chè sắn chay",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/chesanchay.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 2 ,
          foodName: "Canh cua mồng tơi",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhcuamongtoi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 2 ,
          foodName: "Canh chua thịt băm",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhchuathitbam.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 2 ,
          foodName: "Canh chua cá lăng",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhchuacalang.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 2 ,
          foodName: "Canh gà lá giang",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhgalagiang.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 2 ,
          foodName: "Canh ngao chua",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhngaochua.jpg",
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
