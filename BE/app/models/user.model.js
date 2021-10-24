module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
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
      phone: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATEONLY
      }
    });
  
    return User;
  };