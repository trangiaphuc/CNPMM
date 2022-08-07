module.exports = (sequelize, Sequelize) => {
    const Quantity = sequelize.define("quantities", {
        quantityName: {
            type: Sequelize.TEXT
        }
    });
    return Quantity;
}