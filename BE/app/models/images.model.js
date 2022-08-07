module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
      type: {
        type: Sequelize.TEXT,
      },
      name: {
        type: Sequelize.TEXT,
      },
      alt: {
        type: Sequelize.TEXT,
      },
      path: {
        type: Sequelize.TEXT
      },
    });
    return Image;
};