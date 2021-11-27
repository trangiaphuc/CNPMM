'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'address-provinces',
      [
        { province:"An Giang"},
        { province:"Kon Tum"},
        { province:"Bà Rịa – Vũng Tàu"},
        { province:"Lai Châu"},
        { province:"Bắc Giang"},	
        { province:"Lâm Đồng"},
        { province:"Bắc Kạn"},
        { province:"Lạng Sơn"},
        { province:"Bạc Liêu"},	
        { province:"Lào Cai"},
        { province:"Bắc Ninh"},	
        { province:"Long An"},
        { province:"Bến Tre"},	
        { province:"Nam Định"},
        { province:"Bình Định"},
        { province:"Nghệ An"},
        { province:"Bình Dương"},
        { province:"Ninh Bình"},
        { province:"Bình Phước"},
        { province:"Ninh Thuận"},
        { province:"Bình Thuận"},
        { province:"Phú Thọ"},
        { province:"Cà Mau"},
        { province:"Phú Yên"},
        { province:"Cần Thơ"},
        { province:"Quảng Bình"},
        { province:"Cao Bằng"},
        { province:"Quảng Nam"},
        { province:"Đà Nẵng"},
        { province:"Quảng Ngãi"},
        { province:"Đắk Lắk"},
        { province:"Quảng Ninh"},
        { province:"Đắk Nông"},
        { province:"Quảng Trị"},
        { province:"Điện Biên"},
        { province:"Sóc Trăng"},
        { province:"Đồng Nai"},
        { province:"Sơn La"},
        { province:"Đồng Tháp"},
        { province:"Tây Ninh"},
        { province:"Gia Lai"},
        { province:"Thái Bình"},
        { province:"Hà Giang"},
        { province:"Thái Nguyên"},
        { province:"Hà Nam"},
        { province:"Thanh Hóa"},
        { province:"Hà Nội"},
        { province:"Thừa Thiên Huế"},
        { province:"Hà Tĩnh"},
        { province:"Tiền Giang"},
        { province:"Hải Dương"},
        { province:"TP Hồ Chí Minh"},
        { province:"Hải Phòng"},
        { province:"Trà Vinh"},
        { province:"Hậu Giang"},
        { province:"Tuyên Quang"},
        { province:"Hòa Bình"},
        { province:"Vĩnh Long"},
        { province:"Hưng Yên"},
        { province:"Vĩnh Phúc"},
        { province:"Khánh Hòa"},
        { province:"Yên Bái"},
        { province:"Kiên Giang"},
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
