module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true
      },
      password: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      gender:{
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      address: {
        type: Sequelize.STRING
      },
      userAvatar: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };