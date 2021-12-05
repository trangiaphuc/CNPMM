module.exports = (sequelize, Sequelize) => {
    const MarketNote = sequelize.define("marketNotes", {
      marketNoteText: {
          type: Sequelize.STRING
      },
      remindDate:{
          type: Sequelize.DATEONLY
      },
      isDone:{
          type: Sequelize.BOOLEAN
      },
      isDeleted: {
          type: Sequelize.BOOLEAN
      }
    });
    return MarketNote;
};