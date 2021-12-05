module.exports = (sequelize, Sequelize) => {
    const MarketNote = sequelize.define("marketNotes", {
      marketNoteName: {
          type: Sequelize.STRING
      },
      remindDate:{
          type: Sequelize.DATEONLY
      },
      isDone:{
          type: Sequelize.BOOLEAN
      },
      isDelete: {
          type: Sequelize.BOOLEAN
      }
    });
    return MarketNote;
};