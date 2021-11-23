'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'foodCookSteps',
      [

        {
          foodId: 1,
          stepNumber: 1,
          stepDescription: "Khoai môn gọt vỏ rửa sạch, thái làm lát mỏng vừa phải.",
          foodCookStepImage: "D:\\git\\CNPMM\\BE/resources/static/assets/tmp/male.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 1,
          stepNumber: 2,
          stepDescription: "Hành tây thái lát, ớt sừng thái sợi, "
          +"gừng tỏi băm nhỏ, hành lá thái nhỏ. Đun nóng dầu ăn trong chảo,"
          +" cho khoai môn vào chiên tới khi hơi vàng thì vớt ra. Đổ phần dầu ăn thừa ra bát.",
          foodCookStepImage: "D:\\git\\CNPMM\\BE/resources/static/assets/tmp/male.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 1,
          stepNumber: 3,
          stepDescription: "Đun nóng một ít dầu ăn trong chảo, cho gừng tỏi, gốc hành, hành tây và ớt sừng vào xào thơm.",
          foodCookStepImage: "D:\\git\\CNPMM\\BE/resources/static/assets/tmp/male.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 1,
          stepNumber: 4,
          stepDescription: "Đổ khoai môn đã chiên vào, thêm chút nước tương, ớt bột và một ít nước."
          +" Sau đó thêm muối, bột gà và đun cho các nguyên liệu thấm gia vị. Cuối cùng thêm hành lá thái nhỏ vào là xong.",
          foodCookStepImage: "D:\\git\\CNPMM\\BE/resources/static/assets/tmp/male.png",
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
