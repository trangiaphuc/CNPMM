module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      alt: {
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING
      },
    });
    return Image;
};