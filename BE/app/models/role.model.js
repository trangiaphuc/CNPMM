module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      name: {
        type: Sequelize.TEXT
      }
    });
  
    return Role;
  };