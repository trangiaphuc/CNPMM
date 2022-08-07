module.exports = (sequelize, Sequelize) => {
    const MarketNote = sequelize.define("marketNotes", {
      marketNoteText: {
          type: Sequelize.TEXT
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