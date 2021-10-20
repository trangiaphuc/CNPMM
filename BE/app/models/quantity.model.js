module.exports = (sequelize, Sequelize) => {
    const Quantity = sequelize.define("quantities", {
        quantityName: {
            type: Sequelize.STRING
        }
    });
    return Quantity;
}