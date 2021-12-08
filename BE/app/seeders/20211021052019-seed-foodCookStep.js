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
          foodId: 5,
          stepNumber: 2,
          stepDescription: "Xếp sẵn vào nồi, đổ nước đun nước luộc chín, vớt ra để nguội rồi sắt thành miếng nhỏ 1 cm.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 5,
          stepNumber: 3,
          stepDescription: "Cho nồi khác lên bếp đun sôi với lượng nước vừa đủ. Cho đường, gừng thái sợi , đun sôi khuấy đều rồi cho sắn đun cùng để lửa nhỏ để vị ngọt của đường ngấm vào từng miến sắn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 5,
          stepNumber: 4,
          stepDescription: "Hòa 2-3 thìa bột năng với 100ml nước, khuấy đều để bột tan, rồi cho vào hỗn hợp đang đun đến khi sánh lại thì tắt bếp.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 5,
          stepNumber: 5,
          stepDescription: "Múc sắn ra bát để dừa sợi trang tri trên cùng cùng chút vừng rang và thường thức.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //foodCategory 2
        //food6
        {
          foodId: 6,
          stepNumber: 1,
          stepDescription: "Cua mua về rửa sạch cho hết bùn đất, tách mai cua, lột bỏ phần yếm rồi khều lấy gạch để riêng, thịt cua đem giã hoặc xay cùng một nhúm muối nhỏ. Sau đó hòa phần cua đã xay với nước rồi lọc qua ray, phần bã ở vỏ cua bỏ đi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 6,
          stepNumber: 2,
          stepDescription: "Đổ nước cua vào nồi, bắc lên bếp nấu sôi. Khi bắt đầu bật bếp thì dùng đũa dài khuấy đều đến khi nước hơi ấm thì đậy hé vung, đun nhỏ lửa cho đến khi sôi bùng, thịt cua sẽ bắt đầu đông lại thành tảng. Từ từ gạt thịt cua sang 1 bên rồi cho rau vào, nêm gia vị vừa ăn.\nLưu ý, khi cho rau vào thì không đảo, thịt cua sẽ dễ bị vỡ và không thành tảng được. Canh cua rất dễ sôi bùng trào ra ngoài nên đừng bật lửa quá to.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 6,
          stepNumber: 3,
          stepDescription: "Chưng gạch cua bằng cách phi thơm cùng hành khô, không nên khuấy nhiều làm vữa gạch, phải đun cho gạch cạn hết nước mới không bị tanh. Sau khi rau đã gần chín thì đổ gạch vào nồi, đun sôi và nêm nếm gia vị vừa ăn là xong.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //food7
        {
          foodId: 7,
          stepNumber: 1,
          stepDescription: "Thịt lợn rửa sạch cho vào máy xay xay nhỏ. Bạn nên rửa thịt lợn với chút muối, sau đó cho vào xay hai lần để thịt không bị dính nhau.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 7,
          stepNumber: 2,
          stepDescription: "Cà chua ngâm muối tầm 10 phút sau đó thái múi cau. Các bạn chú ý, khi chọn cà chua nên chọn quả nào căng bóng, chín đỏ thì mới giàu vitamin và đặc ruột nhé.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 7,
          stepNumber: 3,
          stepDescription: "Rửa sạch hành và rau mùi, cắt khúc. Hành củ bóc vỏ băm nhỏ.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 7,
          stepNumber: 4,
          stepDescription: "Đặt nồi lên bếp, cho chút dầu vào, để dầu nóng già rồi cho hành củ và thịt vào xào săn. Khi thịt săn thì cho 2 thìa cafe nước mắm vào đảo qua, tiếp đến đổ cà chua vào đảo đến khi cà chua chín tái đi thì cho nước vào đun sôi và nêm gia vị vừa với khẩu vị của bạn",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 7,
          stepNumber: 5,
          stepDescription: "Trước khi tắt bếp bạn cho hành lá và rau mùi vào để dậy mùi. Cho canh chua thịt băm ra bát và thưởng thức.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //food8
        {
          foodId: 8,
          stepNumber: 1,
          stepDescription: "Cá lăng làm sạch rồi lấy muối chà xát ngoài da để loại bỏ chất cặn bẩn và chất nhầy. Sau đó, đem cá chặt thành từng khúc dày khoảng 2-3 cm rồi đem ướp cùng với 1 thìa cafe muối, 1/3 thìa cafe tiêu, 1 thìa canh hạt nêm và 2 thìa canh nước mắm, ướp khoảng 20 phút cho ngấm gia vị",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 8,
          stepNumber: 2,
          stepDescription: "Cà chua rửa sạch thái múi cau, măng chua thái lát mỏng vừa ăn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 8,
          stepNumber: 3,
          stepDescription: "Dứa gọt sạch vỏ và mắt rồi lấy 1/2 quả cắt thành các miếng dày khoảng 0.5 cm.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 8,
          stepNumber: 4,
          stepDescription: "Hành lá và ngò tàu rửa sạch thái nhỏ.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 8,
          stepNumber: 5,
          stepDescription: "Bật bếp, cho dầu ăn vào cái nồi, chờ dầu ăn nóng lên, bạn phi hành thơm rồi cho cà chua và măng chua vào xào, khi cà chua và măng mềm thì bạn cho khoảng 1,5 lít nước vào nồi. Khi nước trong nồi sôi chừng 2 phút, bạn cho cá, dứa và ớt vào. Sau đó bạn nêm các thứ gia vị sao cho phù hợp với khẩu vị của các thành viên trong gia đình nhé.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 8,
          stepNumber: 6,
          stepDescription: "Bạn giảm nhỏ lửa, đun khoảng 30 phút là bạn đã có được món canh chua cá lăng ngon tuyệt rồi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 8,
          stepNumber: 7,
          stepDescription: "Đổ canh ra bát, rắc lên một chút rau ngò tàu và hành lá nhé các bạn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //food9
        {
          foodId: 9,
          stepNumber: 1,
          stepDescription: "Sơ chế nguyên liệu: Chặt nhỏ đùi, chân gà, rửa với gừng đập dập. Nhặt và rửa sạch lá giang. Tỏi bóc vỏ, đập dập, băm nhuyễn. Ớt rửa sạch, thái lát Sả bóc bẹ, rửa sạch, cắt khúc ngắn, đập dập Rau ngổ, rau mùi tàu nhặt, rửa sạch, thái khúc ngắn",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 9,
          stepNumber: 2,
          stepDescription: "Đặt nồi lớn lên bếp, cho dầu ăn và tỏi băm vào phi thơm, sau đó thả đùi và chân gà vào xào sơ. Thấy thịt săn lại thì đổ 1 bát tô nước vào hầm gà khoảng 30 phút với xả. Chú ý vừa hầm gà vừa hớt bọt để nước canh được trong.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 9,
          stepNumber: 3,
          stepDescription: "Nêm nước gà với 30gr muối, 40gr bột nêm, 40gr đường và ớt, khuấy đều. Dùng tay vò nhẹ lá giang cho nát rồi thả vào nồi, đảo nhẹ, đun thêm khoảng 5 phút rồi cho mùi tàu và rau ngổ vào, tắt bếp.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 9,
          stepNumber: 4,
          stepDescription: "Dọn canh gà lá giang ra tô, cho thêm rau mùi tàu, rau ngổ lên phía trên, dùng chung với cơm nóng.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //food10
        {
          foodId: 10,
          stepNumber: 1,
          stepDescription: "Cà chua rửa sạch, 1 quả đem thái hạt lựu còn 1 quả bổ múi cau. Gừng đập dập. Hành khô bóc vỏ, thái lát. Hành lá, rau răm, thì là nhặt bỏ lá sâu rồi rửa sạch, thái nhỏ. Dứa thái miếng vừa ăn. Ngao rửa sạch, cho vào nồi, đổ ngập nước rồi cho thêm một chút muối. Sau đó, bật bếp lên luộc ngao.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 10,
          stepNumber: 4,
          stepDescription: "Khi ngao mở hết miệng, bạn vớt ngao ra, nhặt lấy phần thịt ngao. Sau đó ướp cùng nước mắm, bột canh và 1/3 hành khô. Nước luộc ngao đổ ra bát để lắng cặn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 10,
          stepNumber: 4,
          stepDescription: "Đặt nồi lên bếp, cho dầu ăn vào đến khi dầu nóng cho chỗ hành khô còn lại vào phi thơm. Sau đó, bạn cho cà chua vào xào cùng. Đến khi cà chua chín nhừ, bạn đổ hết số ngao vào xào chín và ngấm gia vị. Xào được khoảng 2-3 phút thì bạn dùng thìa múc ngao và cà chua ra bát. Đổ bát nước luộc ngao vào nồi, khi đổ nhớ nhẹ tay để gạn lại phần cặn lắng ở bên dưới bát. Bật bếp đun sôi nước ngao, sau đó cho thêm 2 quả sấu, gừng và dứa thái miếng vào đun khoảng 10 phút.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 10,
          stepNumber: 4,
          stepDescription: "Tiếp theo, bạn đổ ngao và cà chua bổ múi cau vào nồi nước canh, đun thêm khoảng 5 phút nữa, rồi nêm thêm gia vị cho vừa ăn.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodId: 10,
          stepNumber: 4,
          stepDescription: "Cuối cùng, bạn cho hành lá, rau răm, thì là đã thái nhỏ vào nồi canh và tắt bếp. Như vậy là bạn đã hoàn thành món canh chua ngao ngon rồi, thật đơn giản phải không nào? Nước canh trong, có vị ngọt của ngao, vị chua dịu của sấu, cà chua và dứa có tác dụng thanh nhiệt rất tốt cho cả nhà.",
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
