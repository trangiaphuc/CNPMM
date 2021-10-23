'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'products',
      [
        
        {
          proPic : "",
          proName: "Thịt ba rọi heo",
          proDescription: "Ba rọi heo của thương hiệu CP đạt các tiêu chuẩn về an toàn toàn thực phẩm,"
          + "đảm bảo chất lượng, độ tươi ngon. Thịt heo mềm, vân nạc, mỡ rõ ràng nên rất phù hợp làm nguyên liệu để nấu thịt kho hột vịt,"
          +" thịt nướng BBQ. Có thể dùng điện thoại quét mã QR trên tem sản phẩm để kiểm tra nguồn gốc.",
          quantity: 500,
          price: 96000,
          brand: "C.P",
          origin: "Việt Nam",
          productAt: null,
          expireAt: null,
          manual:"Nấu chín trước khi sử dụng",
          preserve: "Thời hạn sử dụng 3 ngày kể từ ngày sản xuất, bảo quản ở nhiệt độ 0 - 4 độ C",
          productCategoryId: 1,
        },
        {
          proPic : "",
          proName: "Cốt lết heo có xương",
          proDescription: "Cốt lết heo có xương G được đóng gói và bảo quản đạt các tiêu chuẩn về an toàn toàn thực phẩm. "
          +"Bản thịt to, vân mỡ mỏng tạo độ béo nhẹ cho miếng thịt nên thường dùng để nướng, ram, chiên áp chảo....",
          quantity: 300,
          price: 50000,
          brand: "G",
          origin: "Việt Nam",
          productAt: null,
          expireAt: null,
          manual:"Nấu chín trước khi sử dụng",
          preserve: "Thời hạn sử dụng 3 ngày kể từ ngày sản xuất, bảo quản ở nhiệt độ 0 - 4 độ C",
          productCategoryId: 1,
        },
        {
          proPic : "",
          proName: "Thịt vai heo",
          proDescription: "Thịt vai heo của thương hiệu CP được đóng gói và bảo quản theo những tiêu chuẩn nghiêm ngặt "+
          "về vệ sinh và an toàn thực phẩm, đảm bảo về chất lượng, độ tươi và ngon của thực phẩm, xuất xứ rõ ràng."
          +" Thịt vai heo mềm, mọng nước nên thường được các bà nội trợ dùng để nấu cháo, luộc hoặc xào với rau củ.",
          quantity: 300,
          price: 41500,
          brand: "C.P",
          origin: "Việt Nam",
          productAt: null,
          expireAt: null,
          manual:"Nấu chín trước khi sử dụng",
          preserve: "Thời hạn sử dụng 3 ngày kể từ ngày sản xuất, bảo quản ở nhiệt độ 0 - 4 độ C",
          productCategoryId: 1,
        },
        {
          proPic : "",
          proName: "Thịt đùi heo",
          proDescription: "Thịt đùi heo G được đóng gói và bảo quản đạt các tiêu chuẩn về an toàn toàn thực phẩ."+
          " Thịt đùi nạc nhiều, ít mỡ nên rất thích hợp cho người có chế độ ăn kiêng, giảm cân có thể chiên, kho, luộc hoặc xào với rau.",
          quantity: 300,
          price: 51500,
          brand: "C.P",
          origin: "Việt Nam",
          productAt: null,
          expireAt: null,
          manual:"Nấu chín trước khi sử dụng",
          preserve: "Thời hạn sử dụng 3 ngày kể từ ngày sản xuất, bảo quản ở nhiệt độ 0 - 4 độ C",
          productCategoryId: 1,
        },
        {
          proPic : "",
          proName: "Sườn non heo",
          proDescription: "Sườn non CP đạt các tiêu chuẩn về an toàn toàn thực phẩm, đảm bảo chất lượng, độ tươi ngon. "
          +"Sườn được cắt sẵn miếng vừa ăn, có thể chế biến thành nhiều món ngon như sườn kho tiêu, sườn nấu canh, sườn xào chua ngọt,...",
          quantity: 500,
          price: 109000,
          brand: "C.P",
          origin: "Việt Nam",
          productAt: null,
          expireAt: null,
          manual:"Nấu chín trước khi sử dụng",
          preserve: "Thời hạn sử dụng 3 ngày kể từ ngày sản xuất, bảo quản ở nhiệt độ 0 - 4 độ C",
          productCategoryId: 1,
        },
        {
          proPic : "",
          proName: "Bông cải trắng tươi",
          proDescription: "Bông cải trắng của Bách hóa Xanh được nuôi trồng và đóng gói theo những tiêu chuẩn nghiêm ngặt, bảo đảm các tiêu chuẩn xanh - sach, chất lượng và an toàn với người dùng."
          +" Hàm lượng dinh dưỡng cao, vị giòn ngọt nên thường được dùng để chế biến các món xào hoặc luộc, giúp tăng cường miễn dịch",
          quantity: 500,
          price: 39000,
          brand: "Bách hóa xanh",
          origin: "Việt Nam",
          productAt: null,
          expireAt: null,
          manual:"",
          preserve: "",
          productCategoryId: 2,
        },
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
