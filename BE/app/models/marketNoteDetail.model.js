module.exports = (sequelize, Sequelize) => {
    const MarketNoteDetail = sequelize.define("marketNoteDetails", {
      marketNoteDetailProduct: {
          type: Sequelize.STRING
      },
      marketNoteDetailQuantity: {
          type: Sequelize.STRING
      },
      isDone:{
          type: Sequelize.BOOLEAN
      }
    });
    return MarketNoteDetail;
};