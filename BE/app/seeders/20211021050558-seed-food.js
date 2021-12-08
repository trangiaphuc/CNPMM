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
        //foodcategory 3
        {
          foodCategoryId: 3 ,
          foodName: "Mực chiên nước mắm",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/mucchiennuocmam.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
        {
          foodCategoryId: 3 ,
          foodName: "Vịt chiên cay",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/vitchiencay.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },      
        {
          foodCategoryId: 3 ,
          foodName: "Cánh gà chiên bơ",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/canhgachienbo.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          foodCategoryId: 3 ,
          foodName: "Thịt ba chỉ quay giòn bì",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/thitbachiquaygionbi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          foodCategoryId: 3 ,
          foodName: "Tôm tẩm bột chiên xù",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/tomtambotchienxu.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        //foodCategory 4
        {
          foodCategoryId: 4 ,
          foodName: "Lòng nướng ngũ vị",
          foodDescription: "Lòng heo nướng là một trong các món nướng tại nhà đơn giản và rất dễ làm. Tuy nhiên bạn cũng sẽ cần phải quan tâm hơn đến những công đoạn làm sạch bởi sơ chế lòng là một khâu rất quan trọng giúp cho món nướng được thơm, ngon và không có mùi hôi khó chịu.",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/longnuongnguvi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          foodCategoryId: 4 ,
          foodName: "Sườn nướng sốt BBQ",
          foodDescription: "Trong danh sách các món BBQ tự làm chắc chắn sẽ không thể thiếu món sườn nướng sốt BBQ. Hương vị thơm ngon của món sườn nướng chắc chắn khiến ai cũng sẽ cảm thấy vô cùng hấp dẫn cho xem!",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/suonnuongsotbbq.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          foodCategoryId: 4 ,
          foodName: "Đùi gà nướng cay",
          foodDescription: "Đùi gà nướng cay là một trong những món nướng ngon được nhiều người yêu thích và có mặt trong menu của nhiều nhà hàng buffet. Vì vậy mà trong bữa tiệc nướng BBQ bạn hãy trổ tài tự làm đồ nướng tại nhà với món ăn này.",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/duiganuongcay.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          foodCategoryId: 4 ,
          foodName: "Thịt xiên nướng rau củ",
          foodDescription: "Một trong các món nướng ngon dễ làm tại nhà mà bạn có thể dễ dàng áp dụng chính là thịt xiên nướng rau củ. Đây được xem là một món ăn đồ nướng tại nhà giàu chất dinh dưỡng, hơn nữa rau củ khi nướng còn giúp bạn khi thưởng thức không bị ngấy chút nào đâu nhé!",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/thitxiennuongraucu.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },  
        {
          foodCategoryId: 4 ,
          foodName: "Bánh mì nướng muối ớt",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/banhminuongmuoiot.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //foodCategory 5
        {
          foodCategoryId: 4 ,
          foodName: "Bánh Mochi nhân đậu đỏ",
          foodDescription: "Bánh mochi nhân đậu đỏ thơm ngon, rất được nhiều người yêu thích. Bạn đã thử chưa, hãy tham khảo cách làm sau nhé.",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/banhmochinhandaudo.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 4 ,
          foodName: "Bánh gạo cay Hàn Quốc",
          foodDescription: "Bánh gạo cay Hàn Quốc làm rất đơn giản và không mất nhiều thời gian, bạn có thể tự làm món bánh này ngay tại căn bếp của mình nhé.",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/banhgaocayhanquoc.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 4 ,
          foodName: "Bánh bông lan",
          foodDescription: "Không nhất thiết phải có lò vi sóng mới làm được bánh bông lan, mà bạn có thể sử dụng nồi cơm điện để hấp bánh, rất đơn giản.",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/banhbonglan.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 4 ,
          foodName: "Bánh xèo",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/banhxeo.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          foodCategoryId: 4 ,
          foodName: "Bánh Sandwich 3 màu",
          foodDescription: "",
          foodCalories: "NaN",
          foodImage: "/resources/static/assets/images/food/banhsandwich3mau.jpg",
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
