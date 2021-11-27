'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'foodCookSteps',
      [

        {
          foodId: 1,
          stepNumber: 1,
          stepDescription: "Ngâm váng đậu trong nước ấm khoảng 20 phút cho mềm sau đó vớt ra rửa sạch. Rồi mang luộc váng đậu khoảng 20 phút vớt ra để ráo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 1,
          stepNumber: 2,
          stepDescription: "Tỏi tây thái nhỏ phi thơm cho đườn, muối, tiêu, vào tàu hũ, đảo đều để trong 15 phút",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 1,
          stepNumber: 3,
          stepDescription: "Trải lá chuối để tàu hũ tẩm gia vị bó tròn. Cố gắng bó chặt tay rồi lấy dây buộc xung quanh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 1,
          stepNumber: 4,
          stepDescription: "Cho giò chay vào nước sôi luộc 1 tiếng vớt ra để nguội và cắt khoanh thưởng thức",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //mon thu hai
        {
          foodId: 2,
          stepNumber: 1,
          stepDescription: "Cho giò chay vào nước sôi luộc 1 tiếng vớt ra để nguội và cắt khoanh thưởng thức",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 2,
          stepNumber: 2,
          stepDescription: "Ngâm miến với nước âm để miến mềm ra khoảng 10 phút, vớt ra để ráo nước. Cắt miến dài phù hợp sao cho vừa ăn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 2,
          stepNumber: 3,
          stepDescription: "Cho 2 thìa dầu mè, 1 thìa hạt nêm vào trộn đều để miến ngấm gia vị",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 2,
          stepNumber: 4,
          stepDescription: "Mộc nhĩ ngâm nước sôi để nở trong khoảng 10 phút vớt ra rửa sạch, để ráo thái sợi. Nấm hương cà rốt, ớt chuông rửa sạch thái sợi, hành lá cắt khúc.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 2,
          stepNumber: 5,
          stepDescription: "Phi thơm hành củ và củ tỏi năm, cho nấm hương, mộc nhĩ, cà rớt, ớt chuông đã sơ chế vào xào hơi săn thì đổ miến rong vào đảo đều trong 5-7 phút là được. Cho ra đĩa rắc hành lá, vừng rang lên là có thể thưởng thức.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //mon thu 3
        {
          foodId: 3,
          stepNumber: 1,
          stepDescription: "Lấy bí đỏ gọt sạch vỏ, cắt thành từng miếng vừa ăn mang đi hấp chính.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 3,
          stepNumber: 2,
          stepDescription: "Sau đó lấy hỗn hợp đổ vào xay nhuyễn với đậu phộng.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 3,
          stepNumber: 3,
          stepDescription: "Sau khi xay xong, cho hỗn hợp qua rây lọc rồi đun sôi trong 3 phút, đổ thêm nước cốt dừa, nêm nêm gia vị sao cho vừa ăn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //mon thu 4
        {
          foodId: 4,
          stepNumber: 1,
          stepDescription: "Hạt sen ngâm nước để qua đêm rồi rửa sạch, để ráo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 2,
          stepDescription: "Cà rốt rửa sạch, tỉa hoa cắt miếng 1 cm, nấm hương rửa sạch để ráo, đậu phụ non thái miếng nhỏ vừa ăn. Rau mùi nhặt lá rửa sạch.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 3,
          stepDescription: "Bắc nồi lên bếp, cho nước đun sôi, vớt hạt sen hầm khoảng 1 tiếng để chín mềm sau đó cho 1 thìa bột nêm và bột canh sao cho nước dùng vừa ăn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 4,
          stepDescription: "Sau đó cho nấm hương, cà rốt vào đun chín, cuối cùng cho đậu phụ non đun thêm 1 phút rồi bắc ra nêm nếm gia vị sao cho vừa ăn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //mon thu 5
        {
          foodId: 5,
          stepNumber: 1,
          stepDescription: "Sắn bóc vỏ, nhâm trong nước để qua đêm cho bớt chất độc.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 2,
          stepDescription: "Xếp sẵn vào nồi, đổ nước đun nước luộc chín, vớt ra để nguội rồi sắt thành miếng nhỏ 1 cm.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 3,
          stepDescription: "Cho nồi khác lên bếp đun sôi với lượng nước vừa đủ. Cho đường, gừng thái sợi , đun sôi khuấy đều rồi cho sắn đun cùng để lửa nhỏ để vị ngọt của đường ngấm vào từng miến sắn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 4,
          stepDescription: "Hòa 2-3 thìa bột năng với 100ml nước, khuấy đều để bột tan, rồi cho vào hỗn hợp đang đun đến khi sánh lại thì tắt bếp.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 4,
          stepNumber: 5,
          stepDescription: "Múc sắn ra bát để dừa sợi trang tri trên cùng cùng chút vừng rang và thường thức.",
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
