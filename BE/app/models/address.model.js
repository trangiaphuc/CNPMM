module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses", {
      province: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      ward: {
        type: Sequelize.STRING
      },
      flatNumber: {
        type: Sequelize.STRING
      }
    });
  
    return Address;
  };